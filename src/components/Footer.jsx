import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import { NAV_LINKS, TIKTOK_URL, waLink, asset } from "../data";

export default function Footer() {
  return (
    <footer className="bg-espresso text-ivory/80 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="w-24 h-24 rounded-full bg-ivory/95 shadow-md flex items-center justify-center mb-4">
              <img
                src={asset("/images/logo-full.png")}
                alt="Daniel Fashion Design"
                className="h-20 w-20"
              />
            </div>
            <p className="text-sm text-ivory/60 max-w-xs">
              Where your dream design becomes reality! Bespoke abayas, Arabic
              dresses, Habesha dresses, and occasion wear crafted in Sharjah.
            </p>
          </div>

          <div>
            <p className="font-medium text-ivory mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-rosegold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-medium text-ivory mb-3">Follow Us</p>
            <div className="flex gap-3">
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-rosegold hover:text-espresso transition-colors"
              >
                <FaTiktok size={16} />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-rosegold hover:text-espresso transition-colors"
              >
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/50">
          <p>
            &copy; {new Date().getFullYear()} Daniel Fashion Design. All rights
            reserved.
          </p>
          <p>Designed with ❤️ in Sharjah</p>
        </div>
      </div>
    </footer>
  );
}
