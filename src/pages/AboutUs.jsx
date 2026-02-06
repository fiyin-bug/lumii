// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="bg-white rounded-xl p-8 max-w-4xl w-full relative z-10 border border-pink-200 shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl font-bold text-center text-[#f4b8da] mb-8"
          style={{ fontFamily: 'Dakota, serif' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          About Lumi Pretty Collection
        </motion.h1>

        <motion.p
          className="text-[#f4b8da] text-center mb-8 text-xl"
          style={{ fontFamily: 'Dakota, serif' }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
        >
          Discover the story behind our exquisite jewelry collection.
        </motion.p>

        <motion.div className="space-y-6 text-[#f4b8da] text-lg" style={{ fontFamily: 'Dakota, serif' }} variants={itemVariants}>
          <motion.p variants={itemVariants}>
            At Lumi Pretty Collection, we believe that every piece of jewelry tells a story. Our passion for beauty and craftsmanship drives us to curate a collection that celebrates elegance, style, and individuality.
          </motion.p>

          <motion.p variants={itemVariants}>
            Founded with the vision to make luxury accessible, we source the finest materials and work with skilled artisans to create pieces that not only look stunning but also stand the test of time.
          </motion.p>

          <motion.p variants={itemVariants}>
            From delicate rings that sparkle with every movement to bold bracelets that make a statement, our collection offers something for every occasion and personal style. Whether you're looking for the perfect engagement ring, a meaningful gift, or simply a treat for yourself, Lumi Pretty Collection has you covered.
          </motion.p>

          <motion.p variants={itemVariants}>
            We are committed to quality, sustainability, and customer satisfaction. Each piece is carefully inspected to ensure it meets our high standards, and we stand behind our products with excellent customer service.
          </motion.p>

          <motion.p variants={itemVariants}>
            Thank you for choosing Lumi Pretty Collection. We hope our jewelry brings joy and confidence to your life.
          </motion.p>
        </motion.div>

        <motion.div className="mt-12 text-center" variants={itemVariants}>
          <p className="text-[#f4b8da] text-lg" style={{ fontFamily: 'Dakota, serif' }}>Shine bright with Lumi Pretty Collection!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
