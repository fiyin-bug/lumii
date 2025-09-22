import React from "react";
import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import JewelryGuides from "../components/JewelryGuides";
import Newsletter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="min-h-screen font-sans">
      <Hero />
      <FeaturedCollections />
      <JewelryGuides />
      <Newsletter />
    </div>
  );
};

export default Home;
