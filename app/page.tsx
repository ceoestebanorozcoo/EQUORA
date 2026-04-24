export const dynamic = 'force-dynamic';

import Navbar from '@/components/landing/Navbar';
import SplashScreen from '@/components/landing/SplashScreen';
import Hero from '@/components/landing/Hero';
import FeaturedProducts from '@/components/landing/FeaturedProducts';
import Categories from '@/components/landing/Categories';
import TechnicalBenefits from '@/components/landing/TechnicalBenefits';
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
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await connectDB();
      const featured = await Product.find({ isFeatured: true })
        .populate('category')
        .sort({ createdAt: -1 })
        .lean();
      if (featured.length >= 20) return JSON.parse(JSON.stringify(featured.slice(0, 20)));
      const featuredIds = featured.map((p) => p._id);
      const rest = await Product.find({ _id: { $nin: featuredIds } })
        .populate('category')
        .sort({ createdAt: -1 })
        .limit(20 - featured.length)
        .lean();
      return JSON.parse(JSON.stringify([...featured, ...rest]));
    } catch (err) {
      if (attempt === 3) {
        console.error('[getFeaturedProducts] failed after 3 attempts:', err);
        return [];
      }
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
  return [];
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
        <FeaturedProducts products={featuredProducts} />
        <Categories />
        <TechnicalBenefits />
        <Lifestyle />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
