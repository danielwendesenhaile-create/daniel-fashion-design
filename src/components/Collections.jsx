import { COLLECTIONS, waLink } from "../data";
import Reveal from "./Reveal";
import CollectionSlideshow from "./CollectionSlideshow";

export default function Collections() {
  return (
    <section
      id="collections"
      className="py-20 md:py-28 bg-blush/30 scroll-mt-nav"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-rosegold font-medium tracking-[0.2em] uppercase text-sm">
            Our Menu
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-burgundy mt-3 mb-4">
            Collections
          </h2>
          <p className="text-espresso/80">
            Five signature categories, each fully customizable to your
            measurements, fabric, and vision.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <div
                id={c.id}
                className="group scroll-mt-nav bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
              >
                <div className="overflow-hidden aspect-[4/5] relative">
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
                    <CollectionSlideshow
                      collectionSlug={c.id}
                      collectionName={c.name}
                      fallbackSrc={c.image}
                      alt={`${c.name} placeholder image`}
                    />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-2xl text-burgundy font-semibold mb-2">
                    {c.name}
                  </h3>
                  <p className="text-sm text-espresso/70 mb-5 flex-1">
                    {c.description}
                  </p>
                  <a
                    href={waLink(
                      `Hello Daniel Fashion Design, I'd like to order from your ${c.name} collection`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-burgundy text-ivory px-5 py-2.5 rounded-full text-sm font-medium hover:bg-rosegold hover:text-espresso transition-colors duration-300"
                  >
                    Order on WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
