import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import JewelryGuides from "../components/JewelryGuides";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <JewelryGuides />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;