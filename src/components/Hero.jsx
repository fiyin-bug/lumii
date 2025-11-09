import React from "react";
import { useNavigate } from 'react-router-dom';
const heroVideo = '/images/HERO/H I.mp4';

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/jewelry');
  };
  return (
    <div className="relative pt-16 md:pt-20 min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Content */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
            Lumi Pretty Collection
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md max-w-2xl mx-auto">
            Discover exquisite jewelry that celebrates your unique beauty
          </p>
        </div>

        {/* Shop Now Button */}
        <div className="flex justify-center mt-8 md:mt-12">
          <button
            className="group relative bg-gradient-to-r from-[var(--desert-sand)] to-[var(--pinkish-brown)] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden touch-manipulation"
            onClick={handleShopNowClick}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Shop Now</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--desert-sand)] to-[var(--pinkish-brown)] rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
