'use client';

import { useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';

export default function CTASection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (bgRef.current) observer.observe(bgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative py-32 px-6 overflow-hidden"
      aria-label="Llamada a la acción"
      ref={bgRef}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=85')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-equora-amber/70" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="reveal font-editorial italic text-white/80 text-xl mb-4">
          Es el momento
        </p>
        <h2 className="reveal font-display text-5xl md:text-7xl text-white tracking-wider mb-6" style={{ transitionDelay: '100ms' }}>
          ELEVA TU PRESENCIA
          <br />EN CADA MONTURA
        </h2>
        <p className="reveal font-editorial italic text-white/80 text-xl mb-10" style={{ transitionDelay: '200ms' }}>
          Colección 2026. Disponible en todo Colombia.
        </p>
        <div className="reveal flex flex-wrap justify-center gap-4" style={{ transitionDelay: '300ms' }}>
          <Button
            size="lg"
            variant="dark"
            onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-equora-dark hover:bg-equora-ivory"
          >
            Comprar ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/20 hover:border-white"
            onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explorar colección
          </Button>
        </div>
      </div>
    </section>
  );
}
