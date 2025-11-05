import React from "react";
import { useNavigate } from 'react-router-dom';
const heroVideo = '/images/HERO/H I.mp4';

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/jewelry');
  };
  return (
    <div className="relative pt-20 min-h-[600px] flex items-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-lg mx-auto text-center md:text-left md:mx-0">
        </div>

        {/* Creative Shop Now Button - Positioned Below */}
        <div className="flex justify-center md:justify-start mt-24 md:mt-32">
          <button
            className="group relative bg-gradient-to-r from-[var(--desert-sand)] to-[var(--pinkish-brown)] text-white px-8 md:px-10 py-4 rounded-full font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            onClick={handleShopNowClick}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Shop Now</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
