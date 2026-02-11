import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { allJewelryProducts } from '../data/Products';

const FeaturedCollections = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Select a diverse mix of products from different categories
  const collections = [
    // Necklaces - mix of different styles
    allJewelryProducts.find(p => p.id === 1), // LPC 403.B


    // Nose Cuffs - new category
    allJewelryProducts.find(p => p.id === 15), // LPC 501 A
    allJewelryProducts.find(p => p.id === 24), // LPC 503 C

    // Bracelets - new designs
    allJewelryProducts.find(p => p.id === 27), // LPC 207 G
    allJewelryProducts.find(p => p.id === 35), // LPC 325 GOLD

    // Rings - mix
    allJewelryProducts.find(p => p.id === 50), // Solitaire Diamond Ring
    allJewelryProducts.find(p => p.id === 54), // Diamond Elegance Ring
  ].filter(Boolean); // Remove any undefined items

  const [activeCategory, setActiveCategory] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCategoryClick = (index) => setActiveCategory(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? collections.length - 1 : prev - 1));

  const getSlideWidth = () => {
    if (window.innerWidth >= 1024) return 25; // 4 items on large screens
    if (window.innerWidth >= 768) return 50;  // 2 items on tablets
    return 50; // 2 items on mobile (changed from 100 to 50)
  };

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    addToCart(item);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-[#f7f1ea] via-[#fdfaf6] to-[#efe5da] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='var(--pinkish-brown)' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--pinkish-brown)] mb-3">Curated Selection</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--espresso)] mb-2">Featured Collections</h2>
          <p className="text-[#6d6258]">Discover our most loved pieces, handpicked for elegance.</p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full shadow-sm border border-[#d8c7b5] bg-[#fffaf5] p-1">
            {['Latest Pieces', 'New Arrivals', 'Bestsellers'].map((cat, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(index)}
                className={`px-4 py-2 text-sm font-medium rounded-full ${
                  activeCategory === index ? 'bg-[var(--pinkish-brown)] text-[#fff8ef]' : 'bg-transparent text-[#62564b]'
                } transition-colors duration-300`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-[200%] md:w-[200%] lg:w-[100%] transition-transform duration-300"
              style={{ transform: `translateX(-${currentSlide * getSlideWidth()}%)` }}
            >
              {collections.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#fffdfb] rounded-2xl shadow-[0_10px_30px_rgba(88,67,47,0.10)] overflow-hidden hover:shadow-[0_14px_40px_rgba(88,67,47,0.16)] transition-shadow duration-300 min-w-full md:min-w-[50%] lg:min-w-[25%] border border-[#eadfd2]"
                >
                  <div className="h-64 overflow-hidden cursor-pointer" onClick={() => handleProductClick(item.id)}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-medium text-[#3f342a] mb-1 flex-grow min-h-[3rem]">{item.name}</h3>
                    <p className="text-[var(--pinkish-brown)] font-bold mt-1 mb-3 text-xl">{item.price}</p>
                    <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-2">
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="group relative flex-1 bg-gradient-to-r from-[#d5bd9f] to-[#8f7459] text-[#fff8f2] py-2.5 px-3 sm:px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 overflow-hidden text-sm sm:text-base"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                          <span>Add to Cart</span>
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(item.id);
                        }}
                        className="group relative flex-shrink-0 bg-gradient-to-br from-[#f8f1e8] to-[#e8d8c8] p-2.5 rounded-lg hover:shadow-md transform hover:scale-110 transition-all duration-300 border border-[#cdb79f]/40 touch-manipulation"
                      >
                        <i className="fas fa-eye text-[var(--pinkish-brown)] group-hover:scale-110 transition-transform duration-300 text-sm sm:text-base"></i>
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--desert-sand)]/10 to-[var(--pinkish-brown)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-[#fffaf5] w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-[var(--pinkish-brown)] hover:bg-[var(--pinkish-brown)] hover:text-[#fffaf2] transition-all duration-300 touch-manipulation z-10 border border-[#dbcab8]"
          >
            <i className="fas fa-chevron-left text-lg"></i>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#fffaf5] w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-[var(--pinkish-brown)] hover:bg-[var(--pinkish-brown)] hover:text-[#fffaf2] transition-all duration-300 touch-manipulation z-10 border border-[#dbcab8]"
          >
            <i className="fas fa-chevron-right text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;
