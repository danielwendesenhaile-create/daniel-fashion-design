import { FaWhatsapp } from "react-icons/fa";
import { waLink } from "../data";

export default function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200"
    >
      <FaWhatsapp size={30} />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40 -z-10" />
    </a>
  );
}
