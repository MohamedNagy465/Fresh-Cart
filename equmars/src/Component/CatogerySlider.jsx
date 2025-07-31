import React from 'react'
import Slider from 'react-slick'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loading from './Loading'

export default function CatogerySlider() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/categories'),
  })

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
    ],
  }

  if (isLoading) return <div><Loading /></div>
  if (isError) return <div>Error loading categories.</div>

  return (
    <div className="my-5 container">
      <Slider {...settings}>
        {data?.data?.data?.map(cat => (
          <div key={cat?._id} className="px-2">
            <img
              src={cat?.image}
              className="w-100 rounded"
              style={{ height: '200px', objectFit: 'cover' }}
              alt={cat?.name}
            />
            <h6 className="text-center mt-2">{cat.name}</h6>
          </div>
        ))}
      </Slider>
    </div>
  )
}
