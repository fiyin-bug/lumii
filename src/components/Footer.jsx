import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Lumis Pretty Collection</h3>
            <p className="text-gray-400 mb-4">
              Elevate your style with our exquisite jewelry pieces designed for the modern woman.
            </p>
            <div className="flex space-x-4">
              {["facebook-f", "instagram", "pinterest-p", "twitter"].map((icon) => (
                <a key={icon} href="#" className="text-gray-400 hover:text-[#f4b8da] transition-colors duration-300">
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              {["Rings", "Necklaces", "Earrings", "Bracelets", "Gift Combos"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#f4b8da] transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Help</h3>
            <ul className="space-y-2">
              {["FAQs", "Shipping & Returns", "Jewelry Care", "Size Guide", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#f4b8da] transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2 text-[#f4b8da]"></i>
                <span className="text-gray-400">123 Jewelry Lane, Fashion District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-2 text-[#f4b8da]"></i>
                <span className="text-gray-400">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-[#f4b8da]"></i>
                <span className="text-gray-400">info@lumispretty.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Lumis Pretty Collection. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {["visa", "mastercard", "amex", "paypal"].map((icon) => (
                <i key={icon} className={`fab fa-cc-${icon} text-2xl text-gray-400`}></i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;