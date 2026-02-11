import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#2e241b] to-[#1f1812] text-[#f8efe6] pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Lumis Pretty Collection</h3>
            <p className="text-[#d6c5b4] mb-4">
              Elevate your style with our exquisite jewelry pieces designed for the modern woman.
            </p>
            <div className="flex space-x-4">
              {["facebook-f", "instagram", "pinterest-p", "twitter"].map((icon) => (
                <a key={icon} href="#" className="text-[#cfbca9] hover:text-[#f4e1cf] transition-colors duration-300">
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Jewelry", path: "/jewelry" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="text-[#cfbca9] hover:text-[#f4e1cf] transition-colors duration-300">
                    {link.name}
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
                  <a href="#" className="text-[#cfbca9] hover:text-[#f4e1cf] transition-colors duration-300">
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
                <i className="fas fa-map-marker-alt mt-1 mr-2 text-[#e8cfb2]"></i>
                <span className="text-[#cfbca9]">Lagos , Nigeria</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-2 text-[#e8cfb2]"></i>
                <span className="text-[#cfbca9]">+2347010583734</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-[#e8cfb2]"></i>
                <span className="text-[#cfbca9]">info@lumispretty.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#584739] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#cfbca9] text-sm mb-4 md:mb-0">
              © 2025 Lumis Pretty Collection. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {["visa", "mastercard", "amex", "paypal"].map((icon) => (
                <i key={icon} className={`fab fa-cc-${icon} text-2xl text-[#cfbca9]`}></i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
