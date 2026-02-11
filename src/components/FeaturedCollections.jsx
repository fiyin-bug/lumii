import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { allJewelryProducts } from '../data/Products';
import { formatNaira } from '../utils/price';

const FeaturedCollections = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const pickByIds = (ids) =>
    ids.map((id) => allJewelryProducts.find((p) => p.id === id)).filter(Boolean);

  const tabCollections = useMemo(() => {
    const latestPieces = pickByIds([1, 15, 24, 27, 35, 50, 54, 61]);
    const newArrivals = [...allJewelryProducts]
      .filter((item) => item.image || (item.images && item.images[0]))
      .sort((a, b) => b.id - a.id)
      .slice(0, 8);
    const bestsellers = pickByIds([1, 5, 27, 35, 38, 61, 73, 81]);

    return [latestPieces, newArrivals, bestsellers];
  }, []);

  const [activeCategory, setActiveCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);

  const collections = tabCollections[activeCategory] || [];
  const totalPages = Math.max(Math.ceil(collections.length / cardsPerPage), 1);
  const visibleItems = collections.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  const handleCategoryClick = (index) => {
    setActiveCategory(index);
    setCurrentPage(0);
  };

  useEffect(() => {
    const updateCardsPerPage = () => {
      setCardsPerPage(window.innerWidth >= 1024 ? 4 : 2);
      setCurrentPage(0);
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(0);
    }
  }, [currentPage, totalPages]);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev <= 0 ? totalPages - 1 : prev - 1));
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
          <div key={`tab-${activeCategory}-page-${currentPage}`} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#fffdfb] rounded-2xl shadow-[0_10px_30px_rgba(88,67,47,0.10)] overflow-hidden hover:shadow-[0_14px_40px_rgba(88,67,47,0.16)] transition-shadow duration-300 border border-[#eadfd2] h-full"
              >
                <div className="h-64 overflow-hidden cursor-pointer" onClick={() => handleProductClick(item.id)}>
                  <img
                    src={item.image || (item.images && item.images[0])}
                    alt={item.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium text-[#3f342a] mb-1 flex-grow min-h-[3rem]">{item.name}</h3>
                  <p className="text-[var(--pinkish-brown)] font-bold mt-1 mb-3 text-xl">{formatNaira(item.price)}</p>
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
          {totalPages > 1 && (
            <>
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
              <div className="mt-6 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentPage === index
                        ? 'w-7 bg-[var(--pinkish-brown)]'
                        : 'w-2.5 bg-[#d6c2ac] hover:bg-[#bfa488]'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;
