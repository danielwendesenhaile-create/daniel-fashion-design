export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const PHONE_DISPLAY = "054 284 1512";
export const PHONE_INTL = "+971542841512";
export const WHATSAPP_NUMBER = "971542841512";
export const WHATSAPP_DEFAULT_TEXT =
  "Hello Daniel Fashion Design, I'd like to book a consultation";

export const waLink = (text = WHATSAPP_DEFAULT_TEXT) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const TIKTOK_URL = "https://www.tiktok.com/@dani.fashion57";
export const TIKTOK_HANDLE = "@dani.fashion57";

export const ADDRESS_LINE = "S 74 - Bu Tena - Sharjah, UAE";
export const PLUS_CODE = "9CF4+Q3 Sharjah";

export const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=9CF4%2BQ3+Sharjah&output=embed";

export const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=9CF4%2BQ3+Sharjah";

export const HOURS = [
  { day: "Saturday", hours: "9:00 AM – 9:00 PM" },
  { day: "Sunday", hours: "9:00 AM – 9:00 PM" },
  { day: "Monday", hours: "9:00 AM – 9:00 PM" },
  { day: "Tuesday", hours: "9:00 AM – 9:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 9:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 9:00 PM" },
  { day: "Friday", hours: "9:00 AM – 9:00 PM" },
];

export const COLLECTIONS = [
  {
    id: "abayas",
    name: "Abayas",
    description:
      "Everyday luxury and hand-embellished abayas, tailored to flatter and made to move with you.",
    image: asset("/images/collection-abayas.svg"),
  },
  {
    id: "arabic-dresses",
    name: "Arabic Dresses",
    description:
      "Traditional and modern Arabic occasion dresses, crafted with rich fabrics and intricate detail.",
    image: asset("/images/collection-arabic.svg"),
  },
  {
    id: "habesha-dresses",
    name: "Habesha Dresses",
    description:
      "Traditional Ethiopian and Eritrean formal wear, handwoven patterns reimagined for modern celebrations.",
    image: asset("/images/collection-habesha.svg"),
  },
  {
    id: "wedding-dresses",
    name: "Wedding Dresses",
    description:
      "Bespoke bridal gowns designed around your story — from first sketch to final fitting.",
    image: asset("/images/collection-wedding.svg"),
  },
  {
    id: "occasion-outfits",
    name: "Occasion Outfits",
    description:
      "Engagement, holidays, programs and special events — statement pieces for every milestone.",
    image: asset("/images/collection-occasion.svg"),
  },
];

export const GALLERY_IMAGES = [
  { src: asset("/images/gallery-1.svg"), alt: "Custom abaya design placeholder" },
  { src: asset("/images/gallery-2.svg"), alt: "Arabic occasion dress placeholder" },
  { src: asset("/images/gallery-3.svg"), alt: "Habesha dress placeholder" },
  { src: asset("/images/gallery-4.svg"), alt: "Wedding gown placeholder" },
  { src: asset("/images/gallery-5.svg"), alt: "Occasion outfit placeholder" },
  { src: asset("/images/gallery-6.svg"), alt: "Bridal detail placeholder" },
  { src: asset("/images/gallery-7.svg"), alt: "Embellished abaya placeholder" },
  { src: asset("/images/gallery-8.svg"), alt: "Evening gown placeholder" },
];

export const REVIEWS = [
  {
    name: "Daniel Wendesen",
    rating: 5,
    text: "I had a great experience with Daniel fashion design. They have professional fashion designers and a lot of design ideas. I recommend all people to go and get satisfaction with their talents.",
  },
  {
    name: "Ewunatu Markos",
    rating: 5,
    text: "Very good",
  },
];

export const GOOGLE_REVIEW_LINK =
  "https://www.google.com/maps/search/?api=1&query=Daniel+Fashion+Design+Sharjah";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  {
    label: "Collections",
    href: "#collections",
    dropdown: COLLECTIONS.map((c) => ({ label: c.name, href: `#${c.id}` })),
  },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];
