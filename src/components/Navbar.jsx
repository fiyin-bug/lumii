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
    <nav className="fixed top-0 left-0 right-0 bg-[#fffaf4]/95 backdrop-blur-md shadow-[0_6px_24px_rgba(79,58,39,0.12)] z-50 border-b border-[#eadfce]">
      <div className="container mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo/Brand Name */}
        <div className="flex items-center">
         <Link to="/" className="text-xl md:text-2xl font-serif font-bold text-[var(--pinkish-brown)] tracking-wide">
            Lumi Pretty Collection
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-[var(--pinkish-brown)]" : "text-[#5d5145] hover:text-[var(--pinkish-brown)]"} >
            Home
          </NavLink>
          {/* --- Jewelry Dropdown --- */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-[#5d5145] hover:text-[var(--pinkish-brown)] transition-colors duration-300 flex items-center whitespace-nowrap"
            >
              Jewelleries <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'} ml-1 text-xs transition-transform`}></i>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#fffaf4] shadow-lg rounded-md py-2 z-10 border border-[#eadfce]">
                {/* Link to main Jewelry page */}
                 <Link
                    to="/jewelry"
                    className="block px-4 py-2 text-sm text-[#5d5145] hover:bg-[var(--pinkish-brown)] hover:text-white"
                    onClick={handleJewelryLinkClick} // Close dropdown on click
                  >
                    All Jewelry
                  </Link>
                {["Rings", "Necklaces", "Earrings", "Bracelets"].map((item) => (
                  <Link
                    key={item}
                    to={`/jewelry/${item.toLowerCase()}`} // Use category in URL
                    className="block px-4 py-2 text-sm text-[#5d5145] hover:bg-[var(--pinkish-brown)] hover:text-white"
                    onClick={handleJewelryLinkClick} // Close dropdown on click
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>
           {/* --- Other Links --- */}
           <NavLink to="/about" className={({ isActive }) => isActive ? "text-[var(--pinkish-brown)]" : "text-[#5d5145] hover:text-[var(--pinkish-brown)]"}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-[var(--pinkish-brown)]" : "text-[#5d5145] hover:text-[var(--pinkish-brown)]"}>
            Contact Us
          </NavLink>
        </div>

        {/* Icons and Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button className="text-[#5d5145] hover:text-[var(--pinkish-brown)] transition-colors duration-300">
            <i className="fas fa-search"></i>
          </button>
          {/* Cart Icon with Count */}
          <Link to="/cart" className="relative text-[#5d5145] hover:text-[var(--pinkish-brown)] transition-colors duration-300">
             <i className="fas fa-shopping-cart"></i>
             {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--pinkish-brown)] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                </span>
             )}
          </Link>
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#5d5145] hover:text-[var(--pinkish-brown)] transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#fffaf4] shadow-lg px-6 py-6 absolute top-full left-0 right-0 border-t border-[#eadfce]">
          <div className="flex flex-col space-y-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-[var(--pinkish-brown)] py-2 text-lg font-medium touch-manipulation"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            {/* Mobile Jewelry Dropdown */}
            <div className="border-t border-gray-100 pt-4">
              <button
                onClick={toggleDropdown}
                className="text-gray-700 hover:text-[var(--pinkish-brown)] transition-colors duration-300 flex items-center w-full justify-between py-2 text-lg font-medium touch-manipulation"
              >
                Jewelleries <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'} ml-2 text-sm transition-transform`}></i>
              </button>
              {isDropdownOpen && (
                <div className="mt-3 space-y-3 pl-4 border-l-2 border-[var(--pinkish-brown)]/20">
                 <Link
                    to="/jewelry"
                    className="block py-2 text-base text-gray-700 hover:text-[var(--pinkish-brown)] touch-manipulation"
                    onClick={handleJewelryLinkClick}
                  >
                    All Jewelry
                  </Link>
                  {["Rings", "Necklaces", "Earrings", "Bracelets"].map((item) => (
                    <Link
                      key={item}
                      to={`/jewelry/${item.toLowerCase()}`}
                      className="block py-2 text-base text-gray-700 hover:text-[var(--pinkish-brown)] touch-manipulation"
                      onClick={handleJewelryLinkClick}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Other Mobile Links */}
            <div className="border-t border-gray-100 pt-4 space-y-4">
              <Link
                to="/about"
                className="block text-gray-700 hover:text-[var(--pinkish-brown)] py-2 text-lg font-medium touch-manipulation"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block text-gray-700 hover:text-[var(--pinkish-brown)] py-2 text-lg font-medium touch-manipulation"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
