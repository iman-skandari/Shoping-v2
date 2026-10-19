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

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { category } = await searchParams;

  return (
    <main>
      <Header />
      <Hero />
      <Reveal><Benefits /></Reveal>
      <Reveal><Categories /></Reveal>
      <Reveal><FeaturedProducts category={category} /></Reveal>
      <Reveal><OfferBanner /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><Newsletter /></Reveal>
      <Footer />
    </main>
  );
}