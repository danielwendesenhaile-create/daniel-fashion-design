import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase, resolveImageUrl } from "../lib/supabase";

export default function CollectionSlideshow({ collectionSlug, fallbackSrc, alt }) {
  const [images, setImages] = useState(null); // null = loading
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("collection_images")
      .select("id, storage_path, alt_text")
      .eq("collection_slug", collectionSlug)
      .order("position", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data) {
          setImages([]);
          return;
        }
        setImages(
          data.map((row) => ({
            id: row.id,
            src: resolveImageUrl(row.storage_path),
            alt: row.alt_text || alt,
          }))
        );
      });

    return () => {
      cancelled = true;
    };
  }, [collectionSlug, alt]);

  const slides = images && images.length > 0 ? images : null;

  useEffect(() => {
    if (!slides || slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides) {
    return <img src={fallbackSrc} alt={alt} loading="lazy" className="w-full h-full object-cover" />;
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[index].id}
          src={slides[index].src}
          alt={slides[index].alt}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {slides.length > 1 && (
        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={(e) => {
                e.preventDefault();
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
