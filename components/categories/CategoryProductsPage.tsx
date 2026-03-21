'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeleton';
import ProductCard from '@/components/landing/ProductCard';
import { IoArrowBack } from 'react-icons/io5';

export default function CategoryProductsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;
    Promise.all([api.get('/categories'), api.get('/products')])
      .then(([cRes, pRes]) => {
        const cats: ICategory[] = cRes.data.data || [];
        const cat = cats.find((c) => c.slug === slug) || null;
        setCategory(cat);
        if (cat) {
          const filtered = (pRes.data.data || []).filter(
            (p: IProduct) => (p.category as ICategory)?._id === cat._id
          );
          setProducts(filtered);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 60);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <section className="min-h-screen bg-equora-ivory pt-32 pb-24 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#6B7280] hover:text-equora-dark transition-colors font-body text-sm mb-10 cursor-pointer"
        >
          <IoArrowBack size={16} aria-hidden="true" />
          Volver
        </button>

        {/* Header */}
        {loading ? (
          <div className="mb-14 space-y-3">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-14 w-64" />
          </div>
        ) : (
          <div className="mb-14">
            <p className="font-editorial italic text-equora-amber text-lg mb-2">Categoría</p>
            <h1 className="font-display text-5xl md:text-6xl text-equora-dark tracking-wider">
              {category ? category.name.toUpperCase() : 'CATEGORÍA NO ENCONTRADA'}
            </h1>
            {!loading && (
              <p className="font-body text-sm text-[#6B7280] mt-3">
                {products.length} producto{products.length !== 1 ? 's' : ''} en esta categoría
              </p>
            )}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : !category ? (
          <div className="text-center py-24">
            <p className="font-editorial italic text-2xl text-[#6B7280] mb-4">
              Categoría no encontrada
            </p>
            <button
              onClick={() => router.push('/categorias')}
              className="font-body text-sm text-equora-amber hover:underline cursor-pointer"
            >
              Ver todas las categorías
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-editorial italic text-2xl text-[#6B7280]">
              No hay productos en esta categoría aún
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product._id} product={product} delay={i * 60} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
