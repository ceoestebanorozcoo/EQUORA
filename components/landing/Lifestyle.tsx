'use client';

import { useEffect, useRef } from 'react';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=85',
    alt: 'Caballo en finca',
    className: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1594388702866-3a14e3e21daa?w=600&q=85',
    alt: 'Entrenamiento ecuestre',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&q=85',
    alt: 'Caballo noble',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1548430395-ec39eaf2aa1a?w=600&q=85',
    alt: 'Competencia ecuestre',
    className: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=85',
    alt: 'Caballista en campo',
    className: 'col-span-1 row-span-1',
  },
];

export default function Lifestyle() {
  const ref = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section className="bg-[#1E2A3A] py-24 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="font-editorial italic text-equora-amber text-lg mb-3">El estilo de vida</p>
          <h2 className="font-display text-5xl md:text-6xl text-[#F9F7F4] tracking-wider">
            PARA QUIEN MONTA
            <br />
            <span className="text-equora-amber">CON CRITERIO</span>
          </h2>
        </div>

        {/* Asymmetric gallery */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[500px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`reveal overflow-hidden rounded-2xl ${img.className}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="w-full h-full transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url('${img.src}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                role="img"
                aria-label={img.alt}
              />
            </div>
          ))}
        </div>

        {/* Tagline overlay */}
        <div className="text-center mt-12 reveal" style={{ transitionDelay: '500ms' }}>
          <blockquote className="font-editorial italic text-3xl md:text-4xl text-[#F9F7F4]/80">
            &ldquo;Para quien monta con criterio.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
