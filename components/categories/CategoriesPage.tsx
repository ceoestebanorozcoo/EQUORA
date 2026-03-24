'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { ICategory } from '@/types';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then((res) => setCategories(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero header */}
      <div className="relative overflow-hidden bg-equora-dark">
        <div className="absolute inset-0 bg-linear-to-b from-equora-dark/80 to-equora-navy/90" />
        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-20 md:pt-44 md:pb-28">
          <button
            onClick={() => router.push('/')}
            className="group inline-flex items-center gap-2.5 font-body text-sm text-[#F9F7F4]/80 hover:text-equora-amber transition-all duration-300 mb-10 cursor-pointer"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#F9F7F4]/50 group-hover:border-equora-amber/60 group-hover:bg-equora-amber/10 transition-all duration-300">
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            </span>
            <span className="tracking-wide uppercase text-xs font-medium">Volver al inicio</span>
          </button>

          <p className="font-editorial text-equora-amber italic text-lg md:text-xl mb-3">
            Búsqueda por secciones
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#F9F7F4] tracking-wider">
            TODAS LAS CATEGORÍAS
          </h1>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-editorial italic text-2xl text-equora-dark/40">
              No hay categorías disponibles aún
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => router.push(`/productos?categoria=${cat._id}`)}
                className="group relative h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer text-left transform-gpu transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-equora-amber/10"
                aria-label={`Ver productos de ${cat.name}`}
              >
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-equora-navy" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-equora-dark/80 via-equora-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h2 className="font-display text-3xl text-[#F9F7F4] tracking-wider mb-1 group-hover:text-gray-300 group-hover:scale-105 inline-block origin-left transition-all duration-300">
                    {cat.name.toUpperCase()}
                  </h2>
                  <p className="font-body text-[#F9F7F4]/60 text-sm">
                    {cat.productCount ?? 0} {cat.productCount === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-equora-navy/0 group-hover:bg-equora-navy flex items-center justify-center transition-all duration-300">
                  <ArrowRight size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
