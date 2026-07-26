import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Collections from "../components/Collections";
import Gallery from "../components/Gallery";
import Reviews from "../components/Reviews";
import Booking from "../components/Booking";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Collections />
        <Gallery />
        <Reviews />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
