'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { ICategory } from '@/types';

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.data || []));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [categories]);

  if (!categories.length) return null;

  const visible = categories.slice(0, 6);
  const hasMore = categories.length > 6;

  return (
    <section id="categorias" className="bg-[#111827] py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="font-editorial italic text-equora-amber text-lg mb-3">Explora</p>
          <h2 className="font-display text-5xl md:text-6xl text-[#F9F7F4] tracking-wider">
            CATEGORÍAS
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {visible.map((cat, i) => (
            <button
              key={cat._id}
              onClick={() => router.push(`/productos?categoria=${cat._id}`)}
              className="reveal group relative overflow-hidden rounded-2xl aspect-square cursor-pointer text-left"
              style={{ transitionDelay: `${i * 100}ms` }}
              aria-label={`Ver productos de ${cat.name}`}
            >
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-[#1E2A3A]" />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-equora-dark/80 via-equora-dark/30 to-transparent" />
              <div className="absolute inset-0 bg-equora-amber/0 group-hover:bg-equora-amber/30 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-display text-lg tracking-wider text-[#F9F7F4] group-hover:text-white transition-colors">
                  {cat.name}
                </p>
              </div>
            </button>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center reveal">
            <Link
              href="/categorias"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-[#F9F7F4] rounded-full font-body font-medium text-base hover:bg-white/10 transition-colors cursor-pointer"
            >
              Ver todas las categorías
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
