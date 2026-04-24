export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import ProductsPage from '@/components/products/ProductsPage';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export const metadata = { title: 'Productos — EQUORA' };

async function getData() {
  try {
    await connectDB();
    const [products, categories] = await Promise.all([
      Product.find({}).populate('category').sort({ createdAt: -1 }).lean(),
      Category.find({}).sort({ name: 1 }).lean(),
    ]);
    return {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    };
  } catch {
    return { products: [], categories: [] };
  }
}

export default async function Page() {
  const { products, categories } = await getData();

  return (
    <>
      <Navbar />
      <main>
        <Suspense>
          <ProductsPage initialProducts={products} initialCategories={categories} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
