'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { ICategory } from '@/types';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    api.get('/categories?featured=true').then((res) => setCategories(res.data.data || []));
  }, []);

  if (!categories.length) return null;

  return (
    <section id="categorias" className="py-24 md:py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="font-editorial text-equora-amber italic text-lg mb-3">
              Categorías
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-equora-dark tracking-wider">
              LO QUE NECESITAS ESTÁ AQUÍ
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.slice(0, 4).map((cat, i) => (
            <ScrollReveal key={cat._id} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 100}>
              <button
                onClick={() => router.push(`/productos?categoria=${cat._id}`)}
                className="group relative block w-full h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer text-left"
                aria-label={`Ver productos de ${cat.name}`}
              >
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-equora-dark" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-equora-dark/80 via-equora-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="font-display text-3xl text-equora-ivory tracking-wider mb-1 group-hover:text-gray-300 group-hover:scale-105 inline-block origin-left transition-all duration-300">
                    {cat.name.toUpperCase()}
                  </h3>
                  <p className="font-body text-equora-ivory/60 text-sm">
                    {cat.productCount ?? 0} {cat.productCount === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-equora-navy/0 group-hover:bg-equora-navy flex items-center justify-center transition-all duration-300">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-bold">
                    →
                  </span>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={400}>
          <div className="text-center mt-12">
            <Link
              href="/categorias"
              className="inline-flex items-center gap-3 px-10 py-4 bg-equora-amber hover:bg-[#8a5224] text-white rounded-full font-body font-medium text-sm tracking-widest uppercase transition-colors duration-300"
            >
              Ver más categorías
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
