import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Morayo Smith",
    quote:
      "I ordered for myself and ended up buying another piece as a gift. The designs are timeless and beautiful. Lumis Collection is definitely a brand to watch.",
  },
  {
    id: 2,
    name: "Sade Johnson",
    quote:
      "I'm very particular about jewelry, but Lumis Collection exceeded my expectations. It gives that soft luxury vibe without being too much. Perfect for everyday wear and special occasions.",
  },
  {
    id: 3,
    name: "Kehinde Ogunleye",
    quote:
      "Honestly, I wasn't expecting it to be this good. The jewelry sits so nicely on the skin and elevates any outfit instantly. Lumis Collection understands elegance.",
  },
  {
    id: 4,
    name: "Lami Williams",
    quote:
      "Lumis Collection surprised me in the best way. The jewelry looks even more beautiful in person—very classy, very feminine. I've worn my necklace twice already and I keep getting compliments. Definitely becoming my go-to jewelry brand.",
  },
  {
    id: 5,
    name: "Lola Stones",
    quote:
      "If you love simple but classy jewelry, this brand is for you. Lumis Collection gives that quiet luxury feel. I'm obsessed already.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      {/* Luxurious background */}
      <div
        className="absolute inset-0 opacity-[0.97]"
        style={{
          background:
            "linear-gradient(165deg, var(--desert-sand-light) 0%, #faf6f2 40%, #f5efe8 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c27e79\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />
      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <header className="text-center mb-12 md:mb-16">
          <p
            className="text-sm uppercase tracking-[0.35em] font-medium mb-3"
            style={{ color: "var(--pinkish-brown)" }}
          >
            What Our Customers Say
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--espresso)] tracking-tight">
            The Lumis Experience
          </h2>
          <p className="mt-4 text-[#6a5b4c] max-w-2xl mx-auto">
            Luxury is not loud — it’s the confidence our pieces bring to every woman who wears them.
          </p>
          <div className="mt-5 w-16 h-px mx-auto bg-[#ccb9a5]" />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <article
              key={item.id}
              className="group relative bg-[#fffdfa]/92 backdrop-blur-sm rounded-2xl p-6 md:p-7 shadow-[0_10px_28px_rgba(86,66,45,0.09)] border border-[#e8ddd4]/80 hover:shadow-[0_16px_42px_rgba(86,66,45,0.16)] hover:border-[#ceb79e]/70 transition-all duration-500 overflow-hidden"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1.5 ${
                  index % 3 === 0
                    ? "bg-gradient-to-r from-[#b98b59] to-[#e5c395]"
                    : index % 3 === 1
                    ? "bg-gradient-to-r from-[#8c5e35] to-[#d2a676]"
                    : "bg-gradient-to-r from-[#d8b286] to-[#9a6f43]"
                }`}
              />
              <div
                className="absolute top-5 left-6 text-5xl font-serif text-[#8f7459]/20 select-none leading-none"
                aria-hidden
              >
                “
              </div>
              <blockquote className="relative pl-2 text-[#5a4f44] text-[0.95rem] md:text-base leading-relaxed min-h-[4.5rem]">
                {item.quote}
              </blockquote>
              <footer className="mt-5 pt-4 border-t border-[#e8ddd4]/90">
                <cite className="not-italic font-serif font-semibold text-[#3f342a] text-lg">
                  {item.name}
                </cite>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
