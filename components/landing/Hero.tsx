'use client';

import { useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110 parallax-bg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1920&q=85')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-equora-dark/90 via-equora-dark/70 to-equora-dark/40" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          <p
            className="font-editorial italic text-equora-amber text-lg mb-4 opacity-0 animate-fade-in animation-delay-100"
            style={{ animationFillMode: 'forwards' }}
          >
            Colección 2026
          </p>

          <h1
            className="font-display text-6xl md:text-8xl leading-none text-[#F9F7F4] mb-6 opacity-0 animate-fade-in-up animation-delay-200"
            style={{ animationFillMode: 'forwards' }}
          >
            ACCESORIOS
            <br />
            <span className="text-equora-amber">EQUINOS</span>
            <br />
            DISEÑADOS PARA
            <br />
            RENDIMIENTO
            <br />Y ESTILO
          </h1>

          <p
            className="font-editorial italic text-xl md:text-2xl text-[#F9F7F4]/80 mb-10 leading-relaxed opacity-0 animate-fade-in-up animation-delay-300"
            style={{ animationFillMode: 'forwards' }}
          >
            &ldquo;Lujo que no necesita explicación.&rdquo;
          </p>

          <div
            className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up animation-delay-400"
            style={{ animationFillMode: 'forwards' }}
          >
            <Button size="lg" variant="amber" onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}>
              Explorar Colección
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:border-white" onClick={() => document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' })}>
              Nuestra Historia
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60" aria-hidden="true">
        <div className="w-px h-12 bg-equora-amber animate-pulse" />
        <span className="font-body text-xs text-[#F9F7F4] tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
