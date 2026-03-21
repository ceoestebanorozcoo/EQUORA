'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { ICategory } from '@/types';
import { Skeleton } from '@/components/ui/Skeleton';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

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
    <section className="min-h-screen bg-equora-ivory pt-32 pb-24 px-6">
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
        <div className="mb-14">
          <p className="font-editorial italic text-equora-amber text-lg mb-2">Explora</p>
          <h1 className="font-display text-5xl md:text-6xl text-equora-dark tracking-wider">
            TODAS LAS CATEGORÍAS
          </h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-56 rounded-2xl" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-editorial italic text-2xl text-[#6B7280]">
              No hay categorías disponibles aún
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => router.push(`/productos?categoria=${cat._id}`)}
                className="group relative rounded-2xl overflow-hidden bg-equora-dark h-56 flex items-end cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 text-left"
              >
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-[#1E2A3A] to-equora-dark" />
                )}

                <div className="relative z-10 p-6 w-full flex items-center justify-between">
                  <div>
                    <p className="font-body text-xs text-equora-amber uppercase tracking-widest mb-1">
                      Ver colección
                    </p>
                    <h2 className="font-display text-3xl tracking-wider text-white">
                      {cat.name.toUpperCase()}
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-equora-amber group-hover:border-equora-amber transition-colors duration-300">
                    <IoArrowForward size={18} aria-hidden="true" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
