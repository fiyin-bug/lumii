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
    if (window.innerWidth >= 1024) return 25;
    if (window.innerWidth >= 768) return 50;
    return 100;
  };

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    addToCart(item);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="py-16 bg-gradient-to-br from-[var(--desert-sand-light)] via-white to-[var(--pinkish-brown-light)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='var(--pinkish-brown)' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Featured Collections</h2>
          <p className="text-gray-600">Discover our most loved pieces</p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            {['Latest Pieces', 'New Arrivals', 'Bestsellers'].map((cat, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(index)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeCategory === index ? 'bg-[var(--pinkish-brown)] text-white' : 'bg-white text-gray-700'
                } border border-[var(--pinkish-brown)] ${index === 0 ? 'rounded-l-lg' : index === 2 ? 'rounded-r-lg' : 'border-t border-b'} hover:bg-[var(--pinkish-brown)] hover:text-white transition-colors duration-300`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-[400%] md:w-[200%] lg:w-[100%] transition-transform duration-300"
              style={{ transform: `translateX(-${currentSlide * getSlideWidth()}%)` }}
            >
              {collections.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 min-w-full md:min-w-[50%] lg:min-w-[25%]"
                >
                  <div className="h-64 overflow-hidden cursor-pointer" onClick={() => handleProductClick(item.id)}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                    <p className="text-[var(--pinkish-brown)] font-bold mt-2">{item.price}</p>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="group relative flex-1 bg-gradient-to-r from-[var(--desert-sand)] to-[var(--pinkish-brown)] text-white py-2.5 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Add to Cart</span>
                          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="group relative bg-gradient-to-br from-[var(--desert-sand-light)] to-[var(--pinkish-brown-light)] p-2.5 rounded-lg hover:shadow-md transform hover:scale-110 transition-all duration-300 border border-[var(--pinkish-brown)]/20"
                      >
                        <i className="fas fa-eye text-[var(--pinkish-brown)] group-hover:scale-110 transition-transform duration-300"></i>
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
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-[var(--pinkish-brown)] hover:bg-[var(--pinkish-brown)] hover:text-white transition-colors duration-300"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-[var(--pinkish-brown)] hover:bg-[var(--pinkish-brown)] hover:text-white transition-colors duration-300"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;
