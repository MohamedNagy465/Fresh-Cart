import React, { useContext, useEffect, useState } from 'react';
import { Eye, Heart, MoreHorizontal, ShoppingCart, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import { wishListContext } from '../Context/WishListContext';

export default function Card({ item, type }) {
  const { AddToCrt, disabled } = useContext(cartContext);
  const { addToWishList, wishListItems } = useContext(wishListContext);
  const [isInWishList, setIsInWishList] = useState(false);
  const [showIcons, setShowIcons] = useState(false); // للموبايل فقط
  const navigate = useNavigate();

  function handleClick() {
    if (!item?._id) return;
    if (type === 'brand') navigate(`/BrandDetails/${item._id}`);
    else if (type === 'category') navigate(`/CategoryDetails/${item._id}`);
  }

  useEffect(() => {
    if (!item?._id) return;
    setIsInWishList(wishListItems?.some((product) => product._id === item._id));
  }, [wishListItems, item?._id]);

  if (type === 'category' || type === 'brand') {
    return (
      <div
        onClick={handleClick}
        data-aos="fade-up"
        className="cursor-pointer bg-white shadow-md rounded-2xl overflow-hidden p-2 transition-transform hover:scale-105 duration-300 flex flex-col items-center"
      >
        <img
          src={item?.image}
          alt={item?.name}
          className="w-full h-40 object-cover rounded-lg"
        />
        <h3 className="mt-3 text-lg font-semibold text-center">{item?.name}</h3>
      </div>
    );
  }

  return (
    <div
      data-aos="fade-up"
      className="bg-white shadow-md rounded-2xl overflow-hidden p-2 transition-transform hover:scale-105 duration-300 cursor-pointer"
    >
      <div className="relative group overflow-hidden">
        <img src={item?.imageCover} alt={item?.title} className="w-full rounded-lg" />

        {/* ✅ زرار الموبايل */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowIcons(!showIcons);
          }}
          className="absolute top-2 right-2 sm:hidden z-10 bg-white p-1 rounded-full shadow-md"
        >
          <MoreHorizontal className="text-gray-600 w-5 h-5" />
        </button>

        {/* ✅ أيقونات التفاعل */}
        <div
          className={`icon flex gap-2 absolute left-1/2 -translate-x-1/2 transition-all duration-300
          ${showIcons ? 'bottom-[50%]' : 'bottom-[-40px]'}
          sm:bottom-[-40px] sm:group-hover:bottom-[50%]`}
        >
          <Heart
            onClick={(e) => {
              e.stopPropagation();
              addToWishList(item?._id);
            }}
            className={`bg-green-500 p-1 rounded-full shadow-md cursor-pointer transition-colors ${
              isInWishList ? 'text-red-500' : 'text-white'
            }`}
          />

          <button
            disabled={disabled}
            className="cursor-pointer disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation();
              AddToCrt(item?._id);
            }}
          >
            <ShoppingCart className="bg-green-500 text-white p-1 rounded-full shadow-md cursor-pointer" />
          </button>

          <Link to={`/ProductDatels/${item?._id}`}>
            <Eye className="bg-green-500 text-white p-1 rounded-full shadow-md cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-lg font-semibold">{item?.title?.split(" ", 2)?.join(" ")}</h3>
        <span className="text-sm text-gray-500">{item?.category?.name}</span>
        <br />
        <span className="text-sm text-gray-600">{item?.brand?.name}</span>
        <br />
        {item?.quantity > 0 ? (
          <span className="text-green-500 font-medium">Available</span>
        ) : (
          <span className="text-red-500 font-medium">Sold Out</span>
        )}
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <span className="text-black font-bold">{item?.price}$</span>
        <p className="flex items-center gap-1 text-yellow-500">
          <Star />
          <span className="text-black">{item?.ratingsAverage}</span>
        </p>
      </div>
    </div>
  );
}
