import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import OfferBanner from "@/components/OfferBanner";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Reveal><Benefits /></Reveal>
      <Reveal><Categories /></Reveal>
      <Reveal><FeaturedProducts /></Reveal>
      <Reveal><OfferBanner /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><Newsletter /></Reveal>
      <Footer />
    </main>
  );
}