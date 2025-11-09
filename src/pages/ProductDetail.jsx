import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allJewelryProducts } from '../data/Products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = allJewelryProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/jewelry');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  if (!product) {
    return (
      <div className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--pinkish-brown)] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-[var(--pinkish-brown)] hover:text-[var(--pinkish-brown-dark)] mb-8 transition-colors duration-300"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-[var(--pinkish-brown)] shadow-md'
                        : 'border-gray-200 hover:border-[var(--pinkish-brown)]/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-[var(--pinkish-brown)] mb-6">
                {product.price}
              </p>
            </div>

            {/* Product Description */}
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'This exquisite piece showcases exceptional craftsmanship and timeless elegance. Perfect for any occasion, this jewelry item combines quality materials with sophisticated design.'}
              </p>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Category:</span>
              <span className="px-3 py-1 bg-[var(--desert-sand)]/10 text-[var(--pinkish-brown)] rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-[var(--pinkish-brown)]/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-3 text-[var(--pinkish-brown)] hover:bg-[var(--pinkish-brown)]/10 disabled:opacity-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <i className="fas fa-minus text-sm"></i>
                  </button>
                  <span className="px-6 py-3 text-lg font-semibold bg-[var(--desert-sand)]/5 border-x border-[var(--pinkish-brown)]/20">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-3 text-[var(--pinkish-brown)] hover:bg-[var(--pinkish-brown)]/10 transition-colors"
                  >
                    <i className="fas fa-plus text-sm"></i>
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="group relative w-full bg-gradient-to-r from-[var(--desert-sand)] to-[var(--pinkish-brown)] text-white py-4 px-8 rounded-xl font-semibold hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span>Add to Cart</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <i className="fas fa-shipping-fast text-[var(--pinkish-brown)]"></i>
                  <span className="text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-undo text-[var(--pinkish-brown)]"></i>
                  <span className="text-gray-600">Easy Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-shield-alt text-[var(--pinkish-brown)]"></i>
                  <span className="text-gray-600">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-gem text-[var(--pinkish-brown)]"></i>
                  <span className="text-gray-600">Authentic Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
