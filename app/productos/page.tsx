import { Suspense } from 'react';
import ProductsPage from '@/components/products/ProductsPage';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MobileCTA from '@/components/landing/MobileCTA';

export const metadata = { title: 'Productos — EQUORA' };

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense>
          <ProductsPage />
        </Suspense>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
