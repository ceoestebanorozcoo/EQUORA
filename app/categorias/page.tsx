import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MobileCTA from '@/components/landing/MobileCTA';
import CategoriesPage from '@/components/categories/CategoriesPage';

export const metadata = { title: 'Categorías — EQUORA' };

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <CategoriesPage />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
