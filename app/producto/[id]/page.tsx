export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductDetail from '@/components/products/ProductDetail';

type ProductResult =
  | { status: 'found'; data: ReturnType<typeof JSON.parse> }
  | { status: 'not_found' }
  | { status: 'error' };

async function getProduct(id: string): Promise<ProductResult> {
  if (!mongoose.Types.ObjectId.isValid(id)) return { status: 'not_found' };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await connectDB();
      const product = await Product.findById(id).populate('category').lean();
      if (!product) return { status: 'not_found' };
      return { status: 'found', data: JSON.parse(JSON.stringify(product)) };
    } catch (err) {
      if (attempt === 3) {
        console.error('[getProduct] failed after 3 attempts:', err);
        return { status: 'error' };
      }
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
  return { status: 'error' };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getProduct(id);

  if (result.status === 'not_found') notFound();

  if (result.status === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-gray-600">
          Error cargando el producto. Por favor intenta de nuevo.
        </p>
        <a href="/" className="underline text-equora-gold">Volver al inicio</a>
      </div>
    );
  }

  return <ProductDetail initialProduct={result.data} />;
}
