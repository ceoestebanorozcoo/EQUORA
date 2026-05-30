export const dynamic = 'force-dynamic';

import { notFound, redirect } from 'next/navigation';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductDetail from '@/components/products/ProductDetail';

type ProductResult =
  | { status: 'found'; data: ReturnType<typeof JSON.parse> }
  | { status: 'not_found' }
  | { status: 'error' }
  | { status: 'timeout' };

async function getProduct(id: string): Promise<ProductResult> {
  if (!mongoose.Types.ObjectId.isValid(id)) return { status: 'not_found' };

  const fetchProduct = async (): Promise<ProductResult> => {
    try {
      await connectDB();
      const product = await Product.findById(id).populate('category').lean();
      if (!product) return { status: 'not_found' };
      return { status: 'found', data: JSON.parse(JSON.stringify(product)) };
    } catch (err) {
      console.error('[getProduct] error:', err);
      return { status: 'error' };
    }
  };

  const timeoutPromise = new Promise<ProductResult>((resolve) =>
    setTimeout(() => resolve({ status: 'timeout' }), 3 * 60 * 1000)
  );

  return Promise.race([fetchProduct(), timeoutPromise]);
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getProduct(id);

  if (result.status === 'not_found') notFound();
  if (result.status === 'error' || result.status === 'timeout') redirect('/');

  return <ProductDetail initialProduct={result.data} />;
}
