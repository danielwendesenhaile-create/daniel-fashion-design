import { useCallback, useEffect, useState } from "react";
import { Expand } from "lucide-react";
import { supabase, resolveImageUrl } from "../lib/supabase";
import CollectionLightbox from "./CollectionLightbox";

export default function CollectionSlideshow({ collectionSlug, collectionName, fallbackSrc, alt }) {
  const [images, setImages] = useState(null); // null = loading
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
  const lightboxSlides = slides || [{ id: "fallback", src: fallbackSrc, alt }];

  useEffect(() => {
    if (!slides || slides.length < 2 || lightboxOpen) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides, lightboxOpen]);

  const openLightbox = () => {
    setLightboxIndex(slides ? index : 0);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={openLightbox}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLightbox();
          }
        }}
        aria-label={`View and order ${collectionName} photos`}
        className="relative w-full h-full block group/photo cursor-pointer"
      >
        {!slides ? (
          <img
            src={fallbackSrc}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          slides.map((slide, i) => (
            <img
              key={slide.id}
              src={slide.src}
              alt={slide.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out"
              style={{ opacity: i === index ? 1 : 0 }}
            />
          ))
        )}

        <div className="absolute inset-0 bg-espresso/0 group-hover/photo:bg-espresso/30 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1.5 bg-white/90 text-espresso text-xs font-medium px-3 py-1.5 rounded-full">
            <Expand size={13} /> View &amp; order
          </span>
        </div>

        {slides && slides.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show photo ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
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

      {lightboxOpen && (
        <CollectionLightbox
          slides={lightboxSlides}
          index={lightboxIndex}
          setIndex={setLightboxIndex}
          collectionName={collectionName}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
