import { motion } from "framer-motion";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "lumiijohnson@gmail.com",
    href: "mailto:lumiijohnson@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "09126463659",
    href: "tel:09126463659",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@peczys.c",
    href: "https://www.instagram.com/peczys.c",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lagos, Nigeria",
  },
];

const ContactUs = () => {
  return (
    <section className="min-h-screen px-4 py-16 md:py-20 bg-gradient-to-b from-[#fff8ee] via-[#fffaf4] to-[#f5e7d7]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 md:mb-14"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--pinkish-brown)] mb-4">
            Contact Lumis
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[var(--espresso)] mb-4">
            Let’s Connect
          </h1>
          <p className="max-w-2xl mx-auto text-[#5f4d3f] text-base md:text-lg">
            For inquiries, custom requests, collaborations, or support, we are always happy to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-[#fffdf9] rounded-3xl border border-[#e7d5c0] p-6 md:p-8 shadow-[0_14px_38px_rgba(86,61,35,0.12)]"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-[var(--espresso)] mb-3">Reach Out</h2>
            <p className="text-[#635243] mb-7">
              We typically respond quickly and make sure every customer experience feels premium.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((item, index) => {
                const Icon = item.icon;
                const CardTag = item.href ? "a" : "div";

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                  >
                    <CardTag
                      {...(item.href
                        ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-start gap-3 rounded-2xl border border-[#ead9c6] bg-[#fffaf4] p-4 hover:border-[#d8b58c] hover:shadow-[0_10px_22px_rgba(89,64,37,0.13)] transition-all duration-300"
                    >
                      <span className="mt-0.5 h-10 w-10 rounded-full bg-gradient-to-br from-[#edd3b0] to-[#be8f5f] text-[#3b2818] flex items-center justify-center">
                        <Icon size={18} />
                      </span>
                      <span>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#8e6f50] mb-1">{item.label}</p>
                        <p className="text-[#3e3025] font-medium leading-snug">{item.value}</p>
                      </span>
                    </CardTag>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 rounded-3xl p-7 md:p-8 bg-gradient-to-br from-[#f0dbbe] via-[#d8b185] to-[#9d6f42] text-[#2b1d12] shadow-[0_16px_40px_rgba(74,50,28,0.26)]"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-[#6a4528] mb-4">Customer Care</p>
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">We’re Here for You</h3>
            <p className="leading-relaxed text-[#332316] mb-5">
              Whether you need help with sizing, delivery updates, or product recommendations, our
              team will guide you with warmth and professionalism.
            </p>
            <div className="h-px w-full bg-[#7d5534]/35 mb-5" />
            <p className="text-sm text-[#3b2819]">
              Thank you for choosing Lumis Pretty Collection — where every detail is made to feel
              beautiful.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;