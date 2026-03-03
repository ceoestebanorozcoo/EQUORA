import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import ValueProposition from '@/components/landing/ValueProposition';
import BrandStory from '@/components/landing/BrandStory';
import ProductGrid from '@/components/landing/ProductGrid';
import Benefits from '@/components/landing/Benefits';
import Testimonials from '@/components/landing/Testimonials';
import CallToAction from '@/components/landing/CallToAction';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ValueProposition />
      <BrandStory />
      <ProductGrid />
      <Benefits />
      <Testimonials />
      <CallToAction />
      <FAQ />
      <Footer />
    </main>
  );
}
