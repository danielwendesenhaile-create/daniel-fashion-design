import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { waLink } from "../data";

export default function CollectionLightbox({
  slides,
  index,
  setIndex,
  collectionName,
  onClose,
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, setIndex, slides.length]);

  const current = slides[index];

  const orderMessage = `Hello Daniel Fashion Design, I'd like to order this ${collectionName} design: ${current.src}`;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] bg-espresso/90 backdrop-blur-sm flex flex-col"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-ivory flex items-center justify-center"
      >
        <X size={22} />
      </button>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-16 py-6 relative">
        {slides.length > 1 && (
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i - 1 + slides.length) % slides.length);
            }}
            className="absolute left-2 sm:left-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-ivory flex items-center justify-center"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <div
          className="max-w-3xl w-full max-h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current.id}
              src={current.src}
              alt={current.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-full max-h-[65vh] sm:max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
          </AnimatePresence>
        </div>

        {slides.length > 1 && (
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i + 1) % slides.length);
            }}
            className="absolute right-2 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-ivory flex items-center justify-center"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      <div
        className="shrink-0 bg-espresso/95 border-t border-white/10 px-4 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        {slides.length > 1 && (
          <div className="flex justify-center gap-2 mb-4 overflow-x-auto pb-1">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View photo ${i + 1}`}
                className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === index ? "border-rosegold" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={s.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-ivory/80 text-sm text-center">
            {collectionName}
            {slides.length > 1 ? ` — photo ${index + 1} of ${slides.length}` : ""}
          </p>
          <a
            href={waLink(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-burgundy text-ivory px-6 py-2.5 rounded-full text-sm font-medium hover:bg-rosegold hover:text-espresso transition-colors duration-300"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
