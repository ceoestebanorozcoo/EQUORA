'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeleton';
import ProductCard from '@/components/landing/ProductCard';
import { ArrowLeft } from 'lucide-react';

export default function CategoryProductsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-equora-ivory">
      {/* Hero header */}
      <div className="relative overflow-hidden bg-equora-dark">
        <div className="absolute inset-0 bg-linear-to-b from-equora-dark/80 to-equora-navy/90" />
        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-20 md:pt-44 md:pb-28">
          <button
            onClick={() => router.push('/categorias')}
            className="group inline-flex items-center gap-2.5 font-body text-sm text-[#F9F7F4]/80 hover:text-equora-amber transition-all duration-300 mb-10 cursor-pointer"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#F9F7F4]/50 group-hover:border-equora-amber/60 group-hover:bg-equora-amber/10 transition-all duration-300">
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            </span>
            <span className="tracking-wide uppercase text-xs font-medium">Volver a categorías</span>
          </button>

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-5 w-24 bg-white/10" />
              <Skeleton className="h-14 w-72 bg-white/10" />
            </div>
          ) : (
            <>
              <p className="font-editorial text-equora-amber italic text-lg md:text-xl mb-3">
                Categoría
              </p>
              <h1 className="font-display text-5xl md:text-7xl text-[#F9F7F4] tracking-wider">
                {category ? category.name.toUpperCase() : 'CATEGORÍA NO ENCONTRADA'}
              </h1>
              {category && (
                <p className="font-body text-[#F9F7F4]/50 text-base mt-4">
                  {products.length} producto{products.length !== 1 ? 's' : ''} en esta categoría
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : !category ? (
          <div className="text-center py-24">
            <p className="font-editorial italic text-2xl text-equora-dark/40 mb-4">
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
            <p className="font-editorial italic text-2xl text-equora-dark/40">
              No hay productos en esta categoría aún
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
