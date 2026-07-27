import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, waLink, asset } from "../data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-ivory/90 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-20">
        <a href="#home" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            src={asset("/images/logo-full.png")}
            alt="Daniel Fashion Design"
            className="h-11 sm:h-14 md:h-16 w-auto shrink-0"
          />
          <span className="font-serif text-base sm:text-xl md:text-2xl text-burgundy font-semibold tracking-wide leading-tight truncate">
            Daniel Fashion Design
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8 font-medium text-espresso">
          {NAV_LINKS.map((link) => (
            <li key={link.label} className="relative group">
              <a
                href={link.href}
                className="flex items-center gap-1 py-2 hover:text-burgundy transition-colors"
              >
                {link.label}
                {link.dropdown && <ChevronDown size={16} />}
              </a>
              {link.dropdown && (
                <ul className="absolute left-0 top-full min-w-[200px] bg-white border border-rosegold/30 rounded-lg shadow-lg py-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                  {link.dropdown.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 text-sm hover:bg-blush hover:text-burgundy transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center bg-burgundy text-ivory px-5 py-2.5 rounded-full font-medium tracking-wide hover:bg-rosegold hover:text-espresso transition-colors duration-300 shadow-sm"
        >
          Book Consultation
        </a>

        <button
          aria-label="Open menu"
          className="lg:hidden text-burgundy"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>
    </header>

    {/* Mobile drawer */}
    <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-espresso/50"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-ivory shadow-2xl px-6 py-6 flex flex-col transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-serif text-xl text-burgundy font-semibold">
              Menu
            </span>
            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="text-espresso"
            >
              <X size={26} />
            </button>
          </div>

          <ul className="flex flex-col gap-1 font-medium text-espresso">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="border-b border-rosegold/20">
                <div className="flex items-center justify-between">
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 flex-1"
                  >
                    {link.label}
                  </a>
                  {link.dropdown && (
                    <button
                      aria-label="Toggle submenu"
                      onClick={() => setMobileDropdown((v) => !v)}
                      className="p-3"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${mobileDropdown ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
                {link.dropdown && mobileDropdown && (
                  <ul className="pb-2 pl-4 flex flex-col gap-1">
                    {link.dropdown.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-espresso/80 hover:text-burgundy"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-6 text-center bg-burgundy text-ivory px-5 py-3 rounded-full font-medium hover:bg-rosegold hover:text-espresso transition-colors"
          >
            Book Consultation
          </a>
        </div>
      </div>
    </>
  );
}
