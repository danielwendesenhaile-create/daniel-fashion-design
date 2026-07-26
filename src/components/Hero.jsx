import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { waLink, asset } from "../data";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden scroll-mt-nav"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={asset("/images/hero-bg.svg")}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory" />
      </div>

      {/* Illustrated couture silhouette — placeholder for real campaign photography */}
      <motion.img
        src={asset("/images/hero-model.svg")}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.92, y: [0, -14, 0] }}
        transition={{
          opacity: { duration: 1.1, ease: "easeOut" },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
        }}
        className="hidden lg:block absolute right-[2%] xl:right-[8%] top-1/2 -translate-y-1/2 h-[88%] max-h-[780px] w-auto pointer-events-none select-none drop-shadow-2xl"
      />

      <div className="max-w-5xl mx-auto px-5 md:px-8 text-center text-espresso lg:w-full lg:max-w-none lg:text-left lg:pr-[36%] xl:pr-[30%]">
        <motion.a
          href="#reviews"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/70 border border-rosegold/60 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 shadow-sm hover:bg-white transition-colors"
        >
          <span className="flex text-rosegold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span className="text-sm font-medium text-espresso">5.0 · 2 Google Reviews</span>
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-5 text-burgundy"
        >
          Where your dream design
          <br className="hidden sm:block" /> becomes reality!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg text-espresso/80 max-w-2xl mx-auto lg:mx-0 mb-9"
        >
          Luxury custom dresses, abayas, and occasion wear professionally
          designed and crafted in Sharjah.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-burgundy hover:bg-rosegold hover:text-espresso text-ivory px-8 py-3.5 rounded-full font-medium tracking-wide transition-colors duration-300 shadow-lg"
          >
            Book Your Consultation
          </a>
          <a
            href="#collections"
            className="w-full sm:w-auto border border-burgundy/60 text-burgundy hover:border-rosegold hover:bg-burgundy hover:text-ivory px-8 py-3.5 rounded-full font-medium tracking-wide transition-colors duration-300"
          >
            View Collections
          </a>
        </motion.div>
      </div>
    </section>
  );
}
