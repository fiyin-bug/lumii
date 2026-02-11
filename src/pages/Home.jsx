import React from "react";
import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/NewsLetter";
import ChatbotWidget from "../components/ChatbotWidget";

const Home = () => {
  return (
    <div className="min-h-screen font-sans">
      <Hero />
      <FeaturedCollections />
      <Testimonials />
      <Newsletter />
      <ChatbotWidget />
    </div>
  );
};

export default Home;
