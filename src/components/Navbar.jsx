// src/components/Navbar.js
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom"; // Use NavLink for active styles if needed
import { useCart } from "../context/CartContext"; // Import useCart

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart(); // Get cart functions from context

  const cartCount = getCartCount(); // Get the current count

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false); // Helper to close dropdown

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close dropdown when opening/closing mobile menu
    setIsDropdownOpen(false);
  }
  const closeMobileMenu = () => setIsMobileMenuOpen(false); // Helper to close mobile menu


  const handleJewelryLinkClick = () => {
      closeDropdown();
      closeMobileMenu(); // Also close mobile menu if open
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo/Brand Name */}
        <div className="flex items-center">
         <Link to="/" className="text-xl md:text-2xl font-serif font-bold text-[#f4b8da]">
            Lumiprettycollection
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-[#f4b8da]" : "text-gray-700 hover:text-[#f4b8da]"} >
            Home
          </NavLink>
          {/* --- Jewelry Dropdown --- */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-[#f4b8da] transition-colors duration-300 flex items-center whitespace-nowrap"
            >
              Jewelleries <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'} ml-1 text-xs transition-transform`}></i>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                {/* Link to main Jewelry page */}
                 <Link
                    to="/jewelry"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f4b8da] hover:text-white"
                    onClick={handleJewelryLinkClick} // Close dropdown on click
                  >
                    All Jewelry
                  </Link>
                {["Rings", "Necklaces", "Earrings", "Bracelets"].map((item) => (
                  <Link
                    key={item}
                    to={`/jewelry/${item.toLowerCase()}`} // Use category in URL
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f4b8da] hover:text-white"
                    onClick={handleJewelryLinkClick} // Close dropdown on click
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>
           {/* --- Other Links --- */}
          <NavLink to="/luxury-hair" className={({ isActive }) => isActive ? "text-[#f4b8da]" : "text-gray-700 hover:text-[#f4b8da]"} >
           Luxury Hair
          </NavLink>
           <NavLink to="/about" className={({ isActive }) => isActive ? "text-[#f4b8da]" : "text-gray-700 hover:text-[#f4b8da]"}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-[#f4b8da]" : "text-gray-700 hover:text-[#f4b8da]"}>
            Contact Us
          </NavLink>
        </div>

        {/* Icons and Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-[#f4b8da] transition-colors duration-300">
            <i className="fas fa-search"></i>
          </button>
          {/* Cart Icon with Count */}
          <Link to="/cart" className="relative text-gray-700 hover:text-[#f4b8da] transition-colors duration-300">
             <i className="fas fa-shopping-cart"></i>
             {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f4b8da] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                </span>
             )}
          </Link>
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-[#f4b8da] transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-6 py-4 absolute top-full left-0 right-0">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-[#f4b8da]" onClick={closeMobileMenu}>
              Home
            </Link>
            {/* Mobile Jewelry Dropdown */}
            <div>
              <button
                onClick={toggleDropdown}
                className="text-gray-700 hover:text-[#f4b8da] transition-colors duration-300 flex items-center w-full justify-between"
              >
                Jewelleries <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'} ml-1 text-xs transition-transform`}></i>
              </button>
              {isDropdownOpen && (
                <div className="mt-2 space-y-2 pl-4">
                 <Link
                    to="/jewelry"
                    className="block py-1 text-sm text-gray-700 hover:text-[#f4b8da]"
                    onClick={handleJewelryLinkClick}
                  >
                    All Jewelry
                  </Link>
                  {["Rings", "Necklaces", "Earrings", "Bracelets"].map((item) => (
                    <Link
                      key={item}
                      to={`/jewelry/${item.toLowerCase()}`}
                      className="block py-1 text-sm text-gray-700 hover:text-[#f4b8da]"
                      onClick={handleJewelryLinkClick}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Other Mobile Links */}
            <Link to="/luxury-hair" className="text-gray-700 hover:text-[#f4b8da]" onClick={closeMobileMenu}>
              Luxury Hair
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#f4b8da]" onClick={closeMobileMenu}>
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#f4b8da]" onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
