import { Scissors, Gem, MessageCircle, Clock } from "lucide-react";
import Reveal from "./Reveal";
import { asset } from "../data";

const FEATURES = [
  {
    icon: Scissors,
    title: "Custom Tailoring",
    text: "Every piece is cut and fitted to your measurements alone.",
  },
  {
    icon: Gem,
    title: "Luxury Fabrics",
    text: "Sourced fabrics and embellishments chosen for quality and drape.",
  },
  {
    icon: MessageCircle,
    title: "Personal Consultation",
    text: "A one-on-one design session to bring your vision to life.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    text: "Your dress, ready and perfect, exactly when you need it.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 scroll-mt-nav">
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <img
            src={asset("/images/about-atelier.jpg")}
            alt="Model wearing a Daniel Fashion Design gown in the atelier"
            className="rounded-2xl shadow-xl w-full h-auto object-cover"
            loading="lazy"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-rosegold font-medium tracking-[0.2em] uppercase text-sm">
            Our Story
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-burgundy mt-3 mb-5">
            Crafted with passion, tailored to you
          </h2>
          <p className="text-espresso/80 leading-relaxed mb-6">
            Daniel Fashion Design is a bespoke fashion house based in Sharjah,
            UAE. Our team of professional fashion designers brings years of
            craftsmanship and a genuine passion for design to every abaya,
            Arabic dress, Habesha dress, wedding gown, and occasion outfit we
            create — turning your ideas into garments you'll treasure.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-3 bg-blush/40 rounded-xl p-4 border border-rosegold/20"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-burgundy text-rosegold flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-espresso text-base mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-espresso/70">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
