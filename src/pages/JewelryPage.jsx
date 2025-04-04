// src/components/JewelryPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { allJewelryProducts } from "../data/products"; // Adjust path if needed
import { useCart } from "../context/CartContext"; // Import useCart

const JewelryPage = () => {
  const { category } = useParams(); // Get category from URL parameter, e.g., "rings"
  const { addToCart } = useCart(); // Get addToCart from context

  // --- State ---
  // Initialize filter based on URL param or default to "All"
  const [activeFilter, setActiveFilter] = useState("All");

  // --- Effect to Sync URL Param with Filter ---
  useEffect(() => {
    // Capitalize first letter for matching category data (e.g., "rings" -> "Rings")
    const formattedCategory = category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "All";

    // Check if the formatted category is valid before setting
    const validCategories = ["All", "Bracelets", "Rings", "Earrings", "Necklaces"];
    if (validCategories.includes(formattedCategory)) {
        setActiveFilter(formattedCategory);
    } else {
        // Optional: Handle invalid category param (e.g., redirect or show 'All')
        setActiveFilter("All");
    }
  }, [category]); // Re-run effect when the URL category parameter changes

  // --- Data ---
  const categories = ["All", "Bracelets", "Rings", "Earrings", "Necklaces"];

  // --- Filtering Logic ---
  const filteredProducts =
    activeFilter === "All"
      ? allJewelryProducts
      : allJewelryProducts.filter(
          (product) => product.category === activeFilter
        );

  // --- Event Handlers ---
  const handleFilterClick = (clickedCategory) => {
    setActiveFilter(clickedCategory);
    // Optional: Update URL when filter button is clicked? (More advanced routing)
    // navigate(`/jewelry/${clickedCategory.toLowerCase()}`); // Requires useNavigate hook
  };

  // --- Add to Cart Handler ---
  // Now uses the function from CartContext
  const handleAddToCart = (product) => {
    addToCart(product); // Call context function
  };

  // --- Render ---
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* --- Page Title --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-3">
            {activeFilter === "All" ? "Our Jewelry Collection" : `${activeFilter}`}
          </h1>
          <p className="text-gray-600">
            {activeFilter === "All"
              ? "Explore handcrafted pieces for every occasion"
              : `Discover our beautiful ${activeFilter.toLowerCase()}`}
          </p>
        </div>

        {/* --- Filter Buttons --- */}
        <div className="flex justify-center flex-wrap mb-10 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 border border-[#f4b8da] ${
                activeFilter === cat
                  ? "bg-[#f4b8da] text-white shadow-md" // Added shadow for active
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- Product Grid --- */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content Container */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium text-gray-800 mb-1 flex-grow min-h-[3rem]"> {/* Added min-height */}
                    {product.name}
                  </h3>
                  <p className="text-[#f4b8da] font-bold mt-1 mb-3 text-xl">
                    {product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)} // Use updated handler
                    className="w-full bg-[#f4b8da] text-white py-2.5 rounded-md hover:bg-[#e9a0c7] transition-colors duration-300 font-medium mt-auto"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // --- Message when no products match filter ---
          <div className="text-center py-10 text-gray-500">
              <p>No products found in the '{activeFilter}' category.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default JewelryPage;