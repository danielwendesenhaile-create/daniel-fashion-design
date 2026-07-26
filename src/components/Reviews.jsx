import { Star, Quote } from "lucide-react";
import { REVIEWS, GOOGLE_REVIEW_LINK } from "../data";
import Reveal from "./Reveal";

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-blush/30 scroll-mt-nav">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-rosegold font-medium tracking-[0.2em] uppercase text-sm">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-burgundy mt-3 mb-4">
            Loved by our clients
          </h2>
          <div className="flex items-center justify-center gap-2 text-rosegold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <p className="text-espresso/70 text-sm mt-2">5.0 · 2 Google Reviews</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-8">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-md h-full flex flex-col">
                <Quote className="text-rosegold mb-4" size={32} />
                <div className="flex text-rosegold mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-espresso/80 leading-relaxed flex-1 mb-6">
                  "{r.text}"
                </p>
                <p className="font-serif text-lg text-burgundy font-semibold">
                  {r.name}
                </p>
                <p className="text-xs text-espresso/50 mt-1">Google Review</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center mt-12">
          <a
            href={GOOGLE_REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-burgundy text-ivory px-6 py-3 rounded-full font-medium hover:bg-rosegold hover:text-espresso transition-colors duration-300"
          >
            Write a Review
          </a>
        </Reveal>
      </div>
    </section>
  );
}
