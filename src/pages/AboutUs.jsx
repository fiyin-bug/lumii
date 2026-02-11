import { motion } from "framer-motion";

const values = [
  {
    title: "Crafted Elegance",
    description:
      "Every design is carefully selected to feel timeless, refined, and effortlessly beautiful.",
  },
  {
    title: "Premium Quality",
    description:
      "From finish to fit, we focus on quality pieces that look luxurious and wear comfortably.",
  },
  {
    title: "Modern Femininity",
    description:
      "Our collections are made for women who love soft luxury and confident everyday styling.",
  },
];

const AboutUs = () => {
  return (
    <section className="min-h-screen px-4 py-16 md:py-20 bg-gradient-to-b from-[#fff7ed] via-[#fffaf4] to-[#f4e6d6]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--pinkish-brown)] mb-4">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[var(--espresso)] mb-5 leading-tight">
            About Lumis Pretty Collection
          </h1>
          <p className="max-w-3xl mx-auto text-[#5c4b3d] text-base md:text-lg leading-relaxed">
            We are a jewelry brand built on soft sophistication — creating elevated pieces that
            bring confidence, grace, and quiet glamour into everyday life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch mb-12 md:mb-16">
          <motion.article
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="bg-[#fffdf9] border border-[#ead9c5] rounded-3xl p-7 md:p-10 shadow-[0_14px_42px_rgba(86,61,35,0.12)]"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-[var(--espresso)] mb-5">Who We Are</h2>
            <div className="space-y-4 text-[#5f4d3e] leading-relaxed">
              <p>
                Lumis Pretty Collection started with one clear mission: make premium jewelry feel
                personal, wearable, and unforgettable.
              </p>
              <p>
                We believe luxury should feel effortless. Whether you are dressing for a special
                event or elevating a simple outfit, our pieces are designed to bring polish and
                confidence without trying too hard.
              </p>
              <p>
                Our collections celebrate timeless silhouettes, feminine details, and modern
                elegance — so your jewelry always feels like you.
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="bg-gradient-to-br from-[#f2dfc8] via-[#e7c8a1] to-[#b98b59] text-[#2c1f14] rounded-3xl p-7 md:p-10 shadow-[0_14px_42px_rgba(86,61,35,0.2)]"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#5f3d22] mb-4">Brand Promise</p>
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-5">Luxury You Can Live In</h3>
            <p className="leading-relaxed text-[#3a291b] mb-6">
              We obsess over details, quality, and presentation — because true luxury is in how a
              piece looks, feels, and lasts over time.
            </p>
            <div className="h-px w-full bg-[#7f5a38]/30 mb-6" />
            <p className="text-[#3a291b] leading-relaxed">
              Thank you for choosing Lumis Pretty Collection. We are honored to be part of your
              style story.
            </p>
          </motion.article>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-[#fffaf4] border border-[#e4d1bc] rounded-2xl p-6 shadow-[0_10px_28px_rgba(84,60,34,0.09)]"
            >
              <h4 className="font-serif text-xl text-[var(--espresso)] mb-2">{item.title}</h4>
              <p className="text-[#5e4d3e] leading-relaxed">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;