import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-6">
      {/* Main Slider */}
      <div className="md:col-span-2 h-[400px]">
        <Slider {...settings}>
          <img src="/slider1.jpeg" className="w-full h-[420px] rounded-lg object-cover" alt="Slide 1" />
          <img src="/slider2.jpg" className="w-full h-[420px] rounded-lg object-cover" alt="Slide 2" />
          <img src="/slider3.jpg" className="w-full h-[420px] rounded-lg object-cover" alt="Slide 3" />
        </Slider>
      </div>

      {/* Side Images */}
      <div className="flex flex-col gap-4 h-[400px]">
        <img src="/slider4.jpg" className="w-full h-1/2 rounded-lg object-cover" alt="Side 1" />
        <img src="/slider5.jpg" className="w-full h-1/2 rounded-lg object-cover" alt="Side 2" />
      </div>
    </div>
  );
}
