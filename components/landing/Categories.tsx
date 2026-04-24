'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { ICategory } from '@/types';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    api.get('/categories').then((res) => {
      const all: ICategory[] = res.data.data || [];
      setTotalCategories(all.length);
      const featured = all.filter((c) => (c as ICategory & { isFeatured?: boolean }).isFeatured);
      const rest = all.filter((c) => !(c as ICategory & { isFeatured?: boolean }).isFeatured);
      const merged = [...featured, ...rest].slice(0, 8);
      setCategories(merged);
    });
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

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-6">
          {categories.map((cat, i) => {
            const len = categories.length;
            const rem = len % 3;
            const isLastAloneMobile = len % 2 !== 0 && i === len - 1;
            let lgClass = 'lg:col-span-2';
            if (rem === 1 && i === len - 1) lgClass += ' lg:col-start-3';
            else if (rem === 2 && i === len - 2) lgClass += ' lg:col-start-2';
            else if (rem === 2 && i === len - 1) lgClass += ' lg:col-start-4';
            const className = [isLastAloneMobile ? 'cat-last-mobile' : '', lgClass].filter(Boolean).join(' ');
            return (
            <ScrollReveal
              key={cat._id}
              direction={i % 2 === 0 ? 'left' : 'right'}
              delay={i * 100}
              className={className}
            >
              <button
                onClick={() => router.push(`/productos?categoria=${cat._id}`)}
                className="group relative block w-full h-44 sm:h-60 md:h-80 rounded-xl md:rounded-2xl overflow-hidden cursor-pointer text-left"
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
                <div className="absolute bottom-0 left-0 p-4 md:p-8">
                  <h3 className="font-display text-base sm:text-2xl md:text-3xl text-white tracking-wider mb-0.5 md:mb-1 group-hover:scale-105 inline-block origin-left transition-all duration-300">
                    {cat.name.toUpperCase()}
                  </h3>
                  <p className="font-body text-equora-ivory/60 text-xs md:text-sm">
                    {cat.productCount ?? 0} {cat.productCount === 1 ? 'producto' : 'productos'}
                  </p>
                </div>
                <div className="absolute top-2 right-2 md:top-4 md:right-4 w-7 h-7 md:w-10 md:h-10 rounded-full bg-equora-navy md:bg-equora-navy/0 md:group-hover:bg-equora-navy flex items-center justify-center transition-all duration-300">
                  <span className="text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-sm md:text-lg font-bold">
                    →
                  </span>
                </div>
              </button>
            </ScrollReveal>
            );
          })}
        </div>

        {totalCategories > 8 && (
          <ScrollReveal direction="up" delay={400}>
            <div className="text-center mt-12">
              <Link
                href="/categorias"
                className="inline-flex items-center gap-3 px-10 py-4 bg-equora-amber hover:bg-[#4a2e1f] text-white rounded-full font-body font-medium text-sm tracking-widest uppercase transition-colors duration-300"
              >
                Ver más categorías
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
