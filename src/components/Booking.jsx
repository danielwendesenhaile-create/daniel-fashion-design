import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { waLink, PHONE_INTL, PHONE_DISPLAY } from "../data";
import Reveal from "./Reveal";

export default function Booking() {
  return (
    <section id="booking" className="py-20 md:py-28 scroll-mt-nav">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <Reveal className="bg-gradient-to-br from-burgundy to-burgundy-dark rounded-3xl px-6 py-14 md:px-16 md:py-16 text-center text-ivory shadow-xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Book Your Consultation Today
          </h2>
          <p className="text-ivory/85 max-w-xl mx-auto mb-9">
            Wedding Dresses · Occasion Outfits · Holidays · Programs — let's
            design something made only for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rosegold text-espresso px-8 py-3.5 rounded-full font-medium hover:bg-white transition-colors duration-300"
            >
              <FaWhatsapp size={20} />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${PHONE_INTL}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-ivory/70 px-8 py-3.5 rounded-full font-medium hover:border-rosegold hover:text-rosegold transition-colors duration-300"
            >
              <Phone size={18} />
              Call Now · {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
