import { Mail, Phone, Instagram, Youtube, Music, Headphones, Mic } from "lucide-react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

export const ContactUs = () => {
  const contactInfo = [
    { icon: Mail, text: "lumiijohnson@gmail.com", href: "mailto:lumiijohnson@gmail.com" },
    { icon: Phone, text: "09126463659", href: "tel:09126463659" },
    { icon: Instagram, text: "Follow us on Instagram", href: "https://www.instagram.com/peczys.c" },
  ]

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
  }

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
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="bg-white rounded-xl p-8 max-w-md w-full relative z-10 border border-pink-200 shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold text-center text-pink-800 mb-8"
          style={{ fontFamily: 'Dakota, serif' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Get in Touch
        </motion.h1>

        <motion.p
          className="text-pink-600 text-center mb-8"
          style={{ fontFamily: 'Dakota, serif' }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
        >
          Ready to shine? Reach out to us for any inquiries, collaborations, or just to say hello!
        </motion.p>

        <motion.div className="space-y-6">
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 text-gray-700 hover:text-pink-600 transition-colors duration-300 group relative"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Contact via ${item.text}`}
            >
              <motion.div
                className="bg-pink-100 p-3 rounded-full group-hover:bg-pink-200 transition-colors duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <item.icon size={24} className="text-pink-600" />
              </motion.div>
              <span className="text-lg">{item.text}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div className="mt-12 text-center" variants={itemVariants}>
          <p className="text-pink-500">Let's create unforgettable moments together!</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ContactUs;
