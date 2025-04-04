import React from "react";

const Newsletter = () => {
  return (
    <div className="py-16 bg-[#f4b8da]/10">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Join Our Mailing List</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to receive exclusive offers, new arrivals, and styling tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f4b8da] text-sm border-none shadow-sm"
            />
            <button className="bg-[#f4b8da] text-white px-8 py-3 rounded-full font-medium hover:bg-[#e9a0c7] transition-colors duration-300 shadow-md">
              Subscribe
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;