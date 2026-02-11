import React from "react";

const Newsletter = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-[#f6eee4] to-[#efe2d3] border-y border-[#e3d4c2]">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--pinkish-brown)] mb-3">Exclusive Access</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--espresso)] mb-3">Join Our Mailing List</h2>
          <p className="text-[#6a5d50] mb-8">
            Be the first to see new arrivals, limited drops, and elegant styling inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--pinkish-brown)] text-sm border border-[#d9c5ae] bg-[#fffaf5] shadow-sm"
            />
            <button className="bg-gradient-to-r from-[#d1b695] to-[#8f7459] text-[#fff8f2] px-8 py-3 rounded-full font-medium hover:from-[#c3a684] hover:to-[#7d644d] transition-all duration-300 shadow-md">
              Subscribe
            </button>
          </div>
          <p className="text-[#7a6e61] text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;