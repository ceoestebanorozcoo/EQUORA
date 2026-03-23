import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import ValueProposition from '@/components/landing/ValueProposition';
import FeaturedProducts from '@/components/landing/FeaturedProducts';
import Categories from '@/components/landing/Categories';
import TechnicalBenefits from '@/components/landing/TechnicalBenefits';
import BrandStory from '@/components/landing/BrandStory';
import BrandValues from '@/components/landing/BrandValues';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import Lifestyle from '@/components/landing/Lifestyle';
import Testimonials from '@/components/landing/Testimonials';
import CTASection from '@/components/landing/CTASection';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';
import MobileCTA from '@/components/landing/MobileCTA';
import HashScroller from '@/components/HashScroller';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HashScroller />
      <main>
        <Hero />
        <ValueProposition />
        <FeaturedProducts />
        <Categories />
        <TechnicalBenefits />
        <Lifestyle />
        <BrandStory />
        <BrandValues />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
