import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allJewelryProducts } from '../data/Products';
import { useCart } from '../context/CartContext';

const JewelryPage = () => {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const formattedCategory = category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : 'All';
    const validCategories = ['All', 'Bracelets', 'Rings', 'Earrings', 'Necklaces'];
    setActiveFilter(validCategories.includes(formattedCategory) ? formattedCategory : 'All');
  }, [category]);

  const categories = ['All', 'Bracelets', 'Rings', 'Earrings', 'Necklaces'];
  const filteredProducts =
    activeFilter === 'All'
      ? allJewelryProducts
      : allJewelryProducts.filter((product) => product.category === activeFilter);

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent event bubbling
    e.stopPropagation();
    addToCart(product);
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
        <div className="flex justify-center flex-wrap mb-10 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 border border-[#f4b8da] ${
                activeFilter === cat ? 'bg-[#f4b8da] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium text-gray-800 mb-1 flex-grow min-h-[3rem]">
                    {product.name}
                  </h3>
                  <p className="text-[#f4b8da] font-bold mt-1 mb-3 text-xl">{product.price}</p>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full bg-[#f4b8da] text-white py-2.5 rounded-md hover:bg-[#e9a0c7] transition-colors duration-300 font-medium mt-auto"
                  >
                    Add to Cart
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
