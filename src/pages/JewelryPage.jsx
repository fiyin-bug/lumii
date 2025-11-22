import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allJewelryProducts } from '../data/Products';
import { useCart } from '../context/CartContext';

const JewelryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const formattedCategory = category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : 'All';
    const validCategories = ['All', 'Bracelets', 'Rings', 'Earrings', 'Necklaces', 'Nose Cuffs', 'Anklets'];
    setActiveFilter(validCategories.includes(formattedCategory) ? formattedCategory : 'All');
  }, [category]);

  const categories = ['All', 'Bracelets', 'Rings', 'Earrings', 'Necklaces', 'Nose Cuffs', 'Anklets'];
  const filteredProducts =
    activeFilter === 'All'
      ? allJewelryProducts
      : allJewelryProducts.filter((product) => product.category === activeFilter);

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent event bubbling
    e.stopPropagation();
    addToCart(product);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-3">
            {activeFilter === 'All' ? 'Our Jewelry Collection' : activeFilter}
          </h1>
          <p className="text-gray-600">
            {activeFilter === 'All'
              ? 'Explore handcrafted pieces for every occasion'
              : `Discover our beautiful ${activeFilter.toLowerCase()}`}
          </p>
        </div>
        <div className="flex justify-center flex-wrap mb-10 gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`group relative px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 border-2 overflow-hidden ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-[var(--desert-sand)] to-[var(--pinkish-brown)] text-white shadow-lg border-transparent'
                  : 'bg-white text-gray-700 border-[var(--pinkish-brown)] hover:border-[var(--pinkish-brown-dark)] hover:shadow-md'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{cat}</span>
                {activeFilter === cat && (
                  <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              {activeFilter !== cat && (
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--desert-sand)]/10 to-[var(--pinkish-brown)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          ))}
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden relative cursor-pointer" onClick={() => handleProductClick(product.id)}>
                  <img
                    src={product.images ? product.images[0] : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Eye button overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                    className="absolute top-3 right-3 group/btn bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-[var(--pinkish-brown)]/20"
                  >
                    <i className="fas fa-eye text-[var(--pinkish-brown)] group-hover/btn:scale-110 transition-transform duration-300"></i>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium text-gray-800 mb-1 flex-grow min-h-[3rem]">
                    {product.name}
                  </h3>
                  <p className="text-[var(--pinkish-brown)] font-bold mt-1 mb-3 text-xl">{product.price}</p>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="group relative w-full bg-gradient-to-r from-[var(--desert-sand)] to-[var(--pinkish-brown)] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden mt-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Add to Cart</span>
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--desert-sand)] to-[var(--pinkish-brown)] rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No products found in the '{activeFilter}' category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JewelryPage;
