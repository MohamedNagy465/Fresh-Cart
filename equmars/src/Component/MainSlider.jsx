import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false, // لو عايز تشيل الأسهم
};

export default function HomeSliderSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-6">
      <div className="md:col-span-2 mb-2 h-[400px]">
        <Slider {...settings}>
          <div className="h-[420px] rounded-lg overflow-hidden">
            <img
              src="/slider1.jpeg"
              className="w-full h-full object-cover transition-all duration-300"
              alt="Slide 1"
            />
          </div>
          <div className="h-[420px] rounded-lg overflow-hidden">
            <img
              src="/slider2.jpg"
              className="w-full h-full object-cover transition-all duration-300"
              alt="Slide 2"
            />
          </div>
          <div className="h-[420px] rounded-lg overflow-hidden">
            <img
              src="/slider3.jpg"
              className="w-full h-full object-cover transition-all duration-300"
              alt="Slide 3"
            />
          </div>
        </Slider>
      </div>

      {/* Side Images */}
      <div className="flex flex-col gap-5 h-[400px]">
        <img
          src="/slider4.jpg"
          className="w-full h-1/2 rounded-lg object-cover"
          alt="Side 1"
        />
        <img
          src="/slider5.jpg"
          className="w-full h-1/2 rounded-lg object-cover"
          alt="Side 2"
        />
      </div>
    </div>
  );
}
