import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import bg1 from "../assets/slider/bg1.jpg";
import bg2 from "../assets/slider/bg2.jpg";
import bg3 from "../assets/slider/bg3.jpg";
import bg4 from "../assets/slider/bg4.jpg";
import bg5 from "../assets/slider/bg5.jpg";
import bg6 from "../assets/slider/bg6.jpg";
import bg7 from "../assets/slider/bg7.jpg";
import bg8 from "../assets/slider/bg8.jpg";
import bg9 from "../assets/slider/bg9.jpg";
import bg10 from "../assets/slider/bg10.jpg";

const images = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];

const BackgroundSlider = () => {
  const settings = {
    autoplay: true,
    infinite: true,
    speed: 2000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] -z-10 overflow-hidden">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`bg-${index}`}
              className="w-full h-[100vh] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BackgroundSlider;
