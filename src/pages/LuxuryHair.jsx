import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const LuxuryHair = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="bg-white rounded-xl p-12 max-w-2xl w-full text-center relative z-10 border border-pink-200 shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <i className="fas fa-crown text-6xl text-[#f4b8da] mb-4"></i>
          <h1 className="text-5xl font-bold text-pink-800 mb-4" style={{ fontFamily: 'Dakota, serif' }}>
            Luxury Hair Collection
          </h1>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
        >
          <h2 className="text-3xl font-semibold text-pink-700 mb-4">Coming Soon</h2>
          <p className="text-pink-600 text-lg mb-6" style={{ fontFamily: 'Dakota, serif' }}>
            We're crafting an exquisite collection of premium hair care products designed to complement your jewelry and enhance your beauty routine.
          </p>
          <p className="text-pink-500 text-base" style={{ fontFamily: 'Dakota, serif' }}>
            Stay tuned for luxurious shampoos, conditioners, styling products, and hair accessories that match the elegance of Lumi Pretty Collection.
          </p>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="inline-flex items-center space-x-2 text-pink-600">
            <i className="fas fa-sparkles"></i>
            <span className="font-medium">Launching Soon</span>
            <i className="fas fa-sparkles"></i>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LuxuryHair;
