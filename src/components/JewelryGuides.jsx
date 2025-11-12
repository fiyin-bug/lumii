import React from "react";

const JewelryGuides = () => {
  const guides = [
    
    { id: 3, title: "Earring Styles Guide", description: "Discover which earring styles...", image: "https://public.readdy.ai/ai/img_res/28b7b1dd92dab67ac6af24c97a69790d.jpg" },
    { id: 4, title: "Bracelet Sizing Guide", description: "How to measure and find...", image: "https://public.readdy.ai/ai/img_res/01aa5eca90e0a87d5f616b0b5d0493f7.jpg" },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Girl's Guide to Jewelry</h2>
          <p className="text-gray-600">Everything you need to know about styling your perfect pieces</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">{guide.title}</h3>
                <p className="text-gray-600 mt-2">{guide.description}</p>
                <a
                  // href="https://readdy.ai/home/7c181144-5ba3-49f5-bbe5-1854771490ca/7d7a485c-ff91-4889-a31e-eebb9b50cc43"
                  className="inline-block mt-4 text-[#f4b8da] font-medium hover:text-[#e9a0c7] transition-colors duration-300"
                >
                  Read More <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JewelryGuides;
