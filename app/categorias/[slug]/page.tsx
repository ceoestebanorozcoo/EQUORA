import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import CategoryProductsPage from '@/components/categories/CategoryProductsPage';

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <CategoryProductsPage />
      </main>
      <Footer />
    </>
  );
}
