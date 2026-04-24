'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import api from '@/lib/axios';

interface ITestimonial {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    api.get('/testimonials').then((res) => setTestimonials(res.data.data || [])).catch(() => {});
  }, []);

  const next = useCallback(() => {
    setTestimonials((list) => {
      setCurrent((c) => (c + 1) % list.length);
      return list;
    });
  }, []);

  const prev = useCallback(() => {
    setTestimonials((list) => {
      setCurrent((c) => (c - 1 + list.length) % list.length);
      return list;
    });
  }, []);

  useEffect(() => {
    if (!paused && testimonials.length > 1) {
      timerRef.current = setInterval(next, 5000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next, testimonials.length]);

  if (!testimonials.length) return null;

  const t = testimonials[current] ?? testimonials[0];

  return (
    <section
      className="py-24 md:py-32 bg-equora-navy px-6"
      aria-label="Testimonios de clientes"
    >
      <div className="max-w-3xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="font-editorial text-equora-amber italic text-lg mb-3">
              Lo que dicen nuestros clientes
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wider">
              TESTIMONIOS
            </h2>
          </div>
        </ScrollReveal>

        <div
          className="text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6" aria-label={`${t.rating} estrellas`}>
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-equora-amber text-equora-amber" aria-hidden="true" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="font-editorial text-xl md:text-2xl italic text-[#E7D6C2]/80 leading-relaxed mb-8">
            &ldquo;{t.text}&rdquo;
          </blockquote>

          {/* Author */}
          <p className="font-display text-lg tracking-wider text-white">
            {t.name}
          </p>
          <p className="font-body text-sm text-[#E7D6C2]/50 mt-1">
            {t.role}
          </p>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#E7D6C2]/20 text-[#E7D6C2]/60 flex items-center justify-center hover:border-equora-amber hover:text-equora-amber transition-colors duration-300 cursor-pointer"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Navegación testimonios">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonio ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? 'bg-equora-amber w-6' : 'bg-[#E7D6C2]/30 w-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#E7D6C2]/20 text-[#E7D6C2]/60 flex items-center justify-center hover:border-equora-amber hover:text-equora-amber transition-colors duration-300 cursor-pointer"
              aria-label="Testimonio siguiente"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
