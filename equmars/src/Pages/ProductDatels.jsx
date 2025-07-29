import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ShoppingCart } from 'lucide-react';a
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../Component/Card';
import { cartContext } from './../Context/CartContext';


export default function ProductDatels() {
  let{AddToCrt}= useContext(cartContext)
   let {id} = useParams()
    const [ product , setProduct] = useState(null)
    const [ relatedProduct , setRelatedProduct] = useState(null)
    const [loading , setLoding] = useState(false)
    const [mainImage, setMainImage] = useState(null); 

   async function getProductDetails() {
  try {
    setLoding(true);
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setProduct(data.data);
    setMainImage(data.data.imageCover || data.data.images[0]); // <-- هنا تعيين الصورة الافتراضية
    getRelatedProduct(data.data.category._id);
  } catch (error) {
    console.log(error);
  } finally {
    setLoding(false);
  }
}
    async function getRelatedProduct(categoryId) {
      try {
        let {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
        console.log(data)
        setRelatedProduct(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
        getProductDetails()
    },[id])
    if(loading){
        return   <>
      <section className="mx-auto px-4 py-10 max-w-6xl bg-white">
        <div className="bg-gray-200 animate-pulse rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
          <div className="w-full max-w-xs mx-auto p-4 bg-gray-200 rounded-xl">
            <div className="w-full h-48 rounded-md overflow-hidden mb-4 flex items-center justify-center bg-gray-300"></div>
             <div className="flex items-center justify-between ">
             <div className="h-20 w-20 rounded-md border overflow-hidden cursor-pointer bg-gray-300"></div>
            <div className="h-20 w-20 rounded-md border overflow-hidden cursor-pointer bg-gray-300"></div>
            <div className="h-20 w-20 rounded-md border overflow-hidden cursor-pointer bg-gray-300"></div>
                </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className=''>
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-6"></div>
              <div className="h-6 bg-gray-300 rounded mb-6"></div>
              <div className="h-6 bg-gray-300 rounded mb-6"></div>
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
            </div>
            <div className="flex gap-4">
              <button className="bg-gray-300 hover:bg-gray-400 transition duration-200 w-full md:w-1/2 flex items-center justify-center gap-2 h-10 rounded">
                <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                <span className="bg-gray-400 h-4 w-16 rounded"></span>
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 transition duration-200 w-full md:w-1/2 h-10 rounded"></button>
            </div>
          </div>
        </div>
        <div className="">
            <h2></h2>
        </div>
      </section>
    </>
    }
        return (
    <section className="mx-auto px-4 py-10 max-w-6xl">
      <div className="bg-white shadow-xl rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-10 p-6 relative text-2xl my-5 font-bold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-green-500 rounded-md">
        <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-xl shadow-lg">
          <div className="w-full h-48 rounded-md overflow-hidden mb-4 flex items-center justify-center bg-gray-100 cursor-pointer">
            <img
              src={mainImage}
              alt={product?.title}
              className="object-contain max-h-full max-w-full"
            />
          </div>
          <Swiper spaceBetween={10} slidesPerView={3} className="h-20">
            {product?.images?.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="h-20 rounded-md border overflow-hidden cursor-pointer hover:border-green-500 transition"
                  onClick={() => setMainImage(img)} 
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="object-cover w-full h-full" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* بقية الكود بدون تغيير */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product?.title}</h2>
            <p className="text-gray-00 mb-6 leading-relaxed">{product?.brand.name}</p>
            <p className="text-gray-600 mb-6 leading-relaxed">{product?.description}</p>
            <p className="text-yellow-500 font-semibold mb-6">⭐ {product?.ratingsAverage}</p>
            <div className="text-2xl font-semibold text-green-600 mb-4">EGP {product?.price}</div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => AddToCrt(product._id)}
              className="btn bg-green-500 hover:bg-green-600 transition duration-200 w-full md:w-1/2 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>

            <Button className="bg-blue-500 hover:bg-blue-600 transition duration-200 w-full md:w-1/2">
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="relative text-2xl my-5 font-bold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-50 after:h-1 after:bg-green-500 rounded">
          Related Product
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {relatedProduct?.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );

}
