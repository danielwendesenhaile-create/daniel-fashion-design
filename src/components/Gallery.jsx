import { useEffect, useState } from "react";
import { FaTiktok } from "react-icons/fa";
import { GALLERY_IMAGES, TIKTOK_URL, TIKTOK_HANDLE } from "../data";
import { supabase, resolveImageUrl } from "../lib/supabase";
import Reveal from "./Reveal";

export default function Gallery() {
  const [images, setImages] = useState(null); // null = loading

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("gallery_images")
      .select("id, storage_path, alt_text")
      .order("position", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data || data.length === 0) {
          setImages(GALLERY_IMAGES);
          return;
        }
        setImages(
          data.map((row) => ({
            src: resolveImageUrl(row.storage_path),
            alt: row.alt_text || "Daniel Fashion Design gallery photo",
          }))
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const gallery = images || GALLERY_IMAGES;

  return (
    <section id="gallery" className="py-20 md:py-28 scroll-mt-nav">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-rosegold font-medium tracking-[0.2em] uppercase text-sm">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-burgundy mt-3 mb-4">
            Gallery
          </h2>
          <p className="text-espresso/80">
            A look at our recent designs. Follow us on TikTok for behind the
            scenes and video content.
          </p>
        </Reveal>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {gallery.map((img, i) => (
            <Reveal key={img.src} delay={(i % 4) * 0.06} className="mb-4 break-inside-avoid">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center mt-12">
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-burgundy text-burgundy px-6 py-3 rounded-full font-medium hover:bg-burgundy hover:text-ivory transition-colors duration-300"
          >
            <FaTiktok size={18} />
            Watch more on TikTok {TIKTOK_HANDLE}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
