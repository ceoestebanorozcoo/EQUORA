'use client';

import { useEffect, useRef } from 'react';

export default function Differentiators() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-equora-dark py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Decorative separator */}
        <div className="reveal flex items-center gap-6">
          <div className="flex-1 h-px bg-equora-amber/30" />
          <div className="w-2 h-2 rounded-full bg-equora-amber" aria-hidden="true" />
          <div className="flex-1 h-px bg-equora-amber/30" />
        </div>

        <blockquote
          className="reveal font-editorial italic text-4xl md:text-5xl lg:text-6xl text-[#F9F7F4] leading-tight"
          style={{ transitionDelay: '200ms' }}
        >
          &ldquo;No es lo que usas.
          <br />
          <span className="text-equora-amber">Es lo que proyectas.</span>&rdquo;
        </blockquote>

        <div className="reveal flex items-center gap-6" style={{ transitionDelay: '300ms' }}>
          <div className="flex-1 h-px bg-equora-amber/30" />
          <div className="w-2 h-2 rounded-full bg-equora-amber" aria-hidden="true" />
          <div className="flex-1 h-px bg-equora-amber/30" />
        </div>

        <blockquote
          className="reveal font-editorial italic text-3xl md:text-4xl text-[#F9F7F4]/70"
          style={{ transitionDelay: '400ms' }}
        >
          &ldquo;Para quien monta con criterio.&rdquo;
        </blockquote>

        <div className="reveal" style={{ transitionDelay: '500ms' }}>
          <p className="font-display text-lg tracking-[6px] text-equora-amber">
            — EQUORA —
          </p>
        </div>
      </div>
    </section>
  );
}
