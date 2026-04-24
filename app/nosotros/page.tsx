import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import ValueProposition from '@/components/landing/ValueProposition';
import BrandStory from '@/components/landing/BrandStory';
import BrandValues from '@/components/landing/BrandValues';

export const metadata = {
  title: 'Nosotros | EQUORA',
  description: 'Conoce la historia, valores y propuesta de Equora.',
};

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main>
        <ValueProposition />
        <BrandStory />
        <BrandValues />
      </main>
      <Footer />
    </>
  );
}
