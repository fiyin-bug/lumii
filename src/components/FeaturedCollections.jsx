import React, { useState } from "react";

const FeaturedCollections = () => {
  const collections = [
    { id: 1, name: "Green Bracelet", price: "$299", image: "src/images/bracelet1.jpg" },
    { id: 2, name: "Pink Bracelet", price: "$249", image: "src/images/bracelet2.jpg" },
    { id: 3, name: "Solitaire Diamond Ring", price: "$179", image: "src/images/ring1.jpg" },
    { id: 4, name: "Vintage Style Cluster Ring", price: "$219", image: "src/images/ring2.jpg" },
  ];

  const [activeCategory, setActiveCategory] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCategoryClick = (index) => setActiveCategory(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? collections.length - 1 : prev - 1));

  // Adjust slide width based on screen size
  const getSlideWidth = () => {
    if (window.innerWidth >= 1024) return 25; // 4 items visible (lg)
    if (window.innerWidth >= 768) return 50;  // 2 items visible (md)
    return 100; // 1 item visible (mobile)
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Featured Collections</h2>
          <p className="text-gray-600">Discover our most loved pieces</p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            {["Latest Pieces", "New Arrivals", "Bestsellers"].map((cat, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(index)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeCategory === index ? "bg-[#f4b8da] text-white" : "bg-white text-gray-700"
                } border border-[#f4b8da] ${index === 0 ? "rounded-l-lg" : index === 2 ? "rounded-r-lg" : "border-t border-b"} hover:bg-[#f4b8da] hover:text-white transition-colors duration-300`}
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
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 min-w-full md:min-w-[50%] lg:min-w-[25%]">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                    <p className="text-[#f4b8da] font-bold mt-2">{item.price}</p>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-[#f4b8da] text-white py-2 rounded hover:bg-[#e9a0c7] transition-colors duration-300">
                        Add to Cart
                      </button>
                      <button className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200 transition-colors duration-300">
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-[#f4b8da] hover:bg-[#f4b8da] hover:text-white transition-colors duration-300"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-[#f4b8da] hover:bg-[#f4b8da] hover:text-white transition-colors duration-300"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollections;