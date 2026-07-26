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
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/50 to-ivory" />
      </div>

      <div className="max-w-5xl mx-auto px-5 md:px-8 text-center text-white">
        <motion.a
          href="#reviews"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-rosegold/50 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 hover:bg-white/20 transition-colors"
        >
          <span className="flex text-rosegold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span className="text-sm font-medium">5.0 · 2 Google Reviews</span>
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-5"
        >
          Where your dream design
          <br className="hidden sm:block" /> becomes reality!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-9"
        >
          Luxury custom dresses, abayas, and occasion wear professionally
          designed and crafted in Sharjah.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
            className="w-full sm:w-auto border border-white/70 hover:border-rosegold hover:text-rosegold px-8 py-3.5 rounded-full font-medium tracking-wide transition-colors duration-300"
          >
            View Collections
          </a>
        </motion.div>
      </div>
    </section>
  );
}
