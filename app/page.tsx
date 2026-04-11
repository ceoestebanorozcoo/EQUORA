export const dynamic = 'force-dynamic';

import Navbar from '@/components/landing/Navbar';
import SplashScreen from '@/components/landing/SplashScreen';
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
import HashScroller from '@/components/ui/HashScroller';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

async function getFeaturedProducts() {
  try {
    await connectDB();
    const products = await Product.find({ isFeatured: true })
      .populate('category')
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(products));
  } catch {
    return [];
  }
}

export default async function LandingPage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <SplashScreen />
      <Navbar />
      <HashScroller />
      <main>
        <Hero />
        <ValueProposition />
        <FeaturedProducts products={featuredProducts} />
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
    </>
  );
}
