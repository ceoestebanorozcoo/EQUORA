export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductDetail from '@/components/products/ProductDetail';

async function getProduct(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await connectDB();
      const product = await Product.findById(id).populate('category').lean();
      if (!product) return null;
      return JSON.parse(JSON.stringify(product));
    } catch (err) {
      if (attempt === 3) {
        console.error('[getProduct] failed after 3 attempts:', err);
        return null;
      }
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
  return null;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return <ProductDetail initialProduct={product} />;
}
