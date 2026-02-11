import React from "react";
import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="min-h-screen font-sans">
      <Hero />
      <FeaturedCollections />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
