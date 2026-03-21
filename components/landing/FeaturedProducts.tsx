'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/categories')]).then(([pRes, cRes]) => {
      setProducts(pRes.data.data || []);
      setCategories(cRes.data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [loading]);

  // Group products by category, max 3 per category, max 6 categories
  const grouped = categories
    .map((cat) => ({
      category: cat,
      products: products
        .filter((p) => (p.category as ICategory)?._id === cat._id)
        .slice(0, 3),
    }))
    .filter((g) => g.products.length > 0)
    .slice(0, 6);

  return (
    <section id="productos" className="bg-equora-ivory py-24 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <p className="font-editorial italic text-equora-amber text-lg mb-2">Lo que hacemos</p>
          <h2 className="font-display text-5xl md:text-6xl text-equora-dark tracking-wider">
            NUESTRA COLECCIÓN
          </h2>
        </div>

        {loading ? (
          <div className="space-y-16">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="h-7 w-40 bg-equora-dark/10 rounded-full mb-6 animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, j) => <ProductCardSkeleton key={j} />)}
                </div>
              </div>
            ))}
          </div>
        ) : grouped.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-editorial italic text-2xl text-[#6B7280]">Próximamente nuevos productos</p>
          </div>
        ) : (
          <div className="space-y-16">
            {grouped.map(({ category, products: catProducts }) => (
              <div key={category._id}>
                {/* Category title */}
                <div className="flex items-center gap-4 mb-8 reveal">
                  <h3 className="font-display text-3xl tracking-wider text-equora-dark">
                    {category.name.toUpperCase()}
                  </h3>
                  <div className="flex-1 h-px bg-equora-dark/15" />
                </div>

                {/* 3 products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catProducts.map((product, i) => (
                    <ProductCard key={product._id} product={product} delay={i * 80} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ver todos button */}
        <div className="mt-16 text-center reveal">
          <Link
            href="/productos"
            className="inline-flex items-center gap-3 px-10 py-4 bg-equora-dark text-equora-ivory rounded-full font-body font-medium text-base hover:bg-[#1E2A3A] transition-colors cursor-pointer"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
}
