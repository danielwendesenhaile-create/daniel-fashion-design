# Daniel Fashion Design — Website

Luxury single-page site for Daniel Fashion Design, a bespoke fashion house in Sharjah, UAE specializing in custom Arabic dresses, abayas, Habesha dresses, wedding gowns, and occasion wear.

Built with React + Vite + Tailwind CSS v4, Framer Motion for scroll-reveal animations, and lucide-react / react-icons for iconography.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` (or the next available port).

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

The production build is output to `dist/`.

## Project structure

```
src/
  components/
    Navbar.jsx          sticky nav, desktop dropdown, mobile drawer
    Hero.jsx
    About.jsx
    Collections.jsx      Abayas, Arabic Dresses, Habesha Dresses, Wedding Dresses, Occasion Outfits
    Gallery.jsx          masonry portfolio grid + TikTok link
    Reviews.jsx          Google review testimonials
    Booking.jsx          consultation CTA (WhatsApp + call)
    Contact.jsx          address, hours, embedded map
    Footer.jsx
    FloatingWhatsApp.jsx fixed WhatsApp button
    Reveal.jsx           shared scroll-reveal wrapper (Framer Motion)
  data.js                 all brand content: phone/WhatsApp, collections, gallery, reviews, hours
public/
  images/                 placeholder SVG images — swap these for real photography
```

## Replacing placeholder images

Every image in `public/images/` is a generated placeholder clearly labeled "PLACEHOLDER IMAGE". Replace them with real photography using the same filenames (or update the paths in `src/data.js`):

- `hero-bg.svg` — hero background
- `about-image.svg` — atelier / brand story photo
- `collection-*.svg` — one per collection card
- `gallery-*.svg` — portfolio gallery grid

## Editing content

Business details (phone number, WhatsApp link, address, hours, collections, gallery, reviews) are centralized in [`src/data.js`](src/data.js) — update them there rather than in individual components.

## Deploying

**Vercel**
```bash
npm i -g vercel
vercel
```

**Netlify**
```bash
npm run build
# drag-and-drop the generated dist/ folder into Netlify, or use the Netlify CLI:
netlify deploy --prod --dir=dist
```

Both platforms auto-detect the Vite build; set the build command to `npm run build` and the publish directory to `dist` if configuring manually.
