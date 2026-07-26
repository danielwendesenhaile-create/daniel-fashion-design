import { useMemo } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import {
  ADDRESS_LINE,
  PLUS_CODE,
  MAP_EMBED_SRC,
  MAP_LINK,
  HOURS,
  PHONE_DISPLAY,
  PHONE_INTL,
  TIKTOK_URL,
  waLink,
} from "../data";
import Reveal from "./Reveal";

function useIsOpenNow(openHour = 9, closeHour = 21) {
  return useMemo(() => {
    const hour = new Date().getHours();
    return hour >= openHour && hour < closeHour;
  }, []);
}

export default function Contact() {
  const isOpen = useIsOpenNow();
  const todayIndex = (new Date().getDay() + 1) % 7; // HOURS starts Saturday, Date.getDay() starts Sunday
  const todayLabel = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section id="contact" className="py-20 md:py-28 bg-blush/30 scroll-mt-nav">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-rosegold font-medium tracking-[0.2em] uppercase text-sm">
            Visit Us
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-burgundy mt-3 mb-4">
            Contact &amp; Location
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-full bg-burgundy text-rosegold flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-espresso mb-1">Address</h3>
                <p className="text-sm text-espresso/70">{ADDRESS_LINE}</p>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-burgundy font-medium hover:text-rosegold"
                >
                  Plus code: {PLUS_CODE}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-full bg-burgundy text-rosegold flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-espresso mb-1">
                  Phone / WhatsApp
                </h3>
                <a
                  href={`tel:${PHONE_INTL}`}
                  className="text-sm text-espresso/70 hover:text-burgundy block"
                >
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-burgundy font-medium hover:text-rosegold mt-1"
                >
                  <FaWhatsapp size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-full bg-burgundy text-rosegold flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-espresso">Business Hours</h3>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {isOpen ? "Open now" : "Closed now"}
                  </span>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {HOURS.map((h, i) => (
                      <tr
                        key={h.day}
                        className={
                          i === todayIndex
                            ? "text-burgundy font-semibold"
                            : "text-espresso/70"
                        }
                      >
                        <td className="py-0.5 pr-4">
                          {h.day}
                          {i === todayIndex && (
                            <span className="text-xs font-normal text-rosegold ml-1">
                              (today)
                            </span>
                          )}
                        </td>
                        <td className="py-0.5 text-right">{h.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-espresso/40 mt-2">
                  Today is {todayLabel}. Hours shown are approximate — please
                  confirm via WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-11 h-11 rounded-full bg-burgundy text-ivory flex items-center justify-center hover:bg-rosegold hover:text-espresso transition-colors"
              >
                <FaTiktok size={18} />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 rounded-full bg-burgundy text-ivory flex items-center justify-center hover:bg-rosegold hover:text-espresso transition-colors"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-h-[400px]">
            <iframe
              title="Daniel Fashion Design location map"
              src={MAP_EMBED_SRC}
              className="w-full h-full min-h-[400px] rounded-2xl shadow-md border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
