import React from "react";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/jewelry');
  };
  return (
    <div
      className="relative pt-20 min-h-[600px] flex items-center"
      style={{
        backgroundImage: `url('https://public.readdy.ai/ai/img_res/7e836dcde3305f880fa01fd1066a4d13.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#f4b8da]/80 to-transparent"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-lg mx-auto text-center md:text-left md:mx-0">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6 lg:mb-8">
            Elegance in Every Detail
          </h2>
          <p className="text-white text-base md:text-lg lg:text-xl mb-8 md:mb-10 lg:mb-12">
            Discover our exquisite collection of handcrafted jewelry designed to elevate your style.
          </p>
          <button
            className="bg-white text-[#f4b8da] px-6 md:px-8 py-3 rounded-full font-medium hover:bg-[#f4b8da] hover:text-white transition-colors duration-300 shadow-md text-sm md:text-base"
            onClick={handleShopNowClick}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
