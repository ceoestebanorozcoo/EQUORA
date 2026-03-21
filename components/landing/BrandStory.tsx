'use client';

import { useEffect, useRef } from 'react';

export default function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelector('.reveal-left')?.classList.add('visible');
            entry.target.querySelector('.reveal-right')?.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="historia" className="bg-[#1E2A3A] py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            className="reveal-left relative"
            style={{ transitionDelay: '0ms' }}
          >
            <div
              className="rounded-2xl overflow-hidden aspect-[4/5]"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=85')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              role="img"
              aria-label="Fotografía ecuestre de finca"
            />
            {/* Decorative amber accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-equora-amber rounded-2xl -z-10" aria-hidden="true" />
          </div>

          {/* Text */}
          <div className="reveal-right" style={{ transitionDelay: '150ms' }}>
            <p className="font-editorial italic text-equora-amber text-lg mb-4">Nuestra Historia</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#F9F7F4] tracking-wider mb-8 leading-tight">
              DE UNA PASIÓN
              <br />
              <span className="text-equora-amber">HEREDADA</span>
            </h2>

            <div className="space-y-5 font-editorial text-lg text-[#F9F7F4]/80 leading-relaxed italic">
              <p>
                Mi amor por los caballos ha existido toda mi vida. En mi familia siempre han estado presentes
                y he tenido el gran privilegio de crecer rodeada de ellos desde que tengo memoria.
                Crecí en una finca, donde el campo, la ganadería y los caballos siempre han sido parte de mi realidad.
              </p>
              <p>
                Pero si hay alguien de quien heredé profundamente este amor por los caballos, fue de mi abuelo.
                De él aprendí a admirar su nobleza, su carácter y la conexión especial que puede existir entre
                una persona y su caballo. Esa pasión fue pasando de generación en generación hasta convertirse
                en una parte esencial de quién soy.
              </p>
              <p>
                Con los años, viviendo de cerca el mundo equino y todo lo que lo rodea, empezó a surgir en mí
                una idea: crear productos pensados para quienes comparten esta misma pasión. Detalles que
                acompañaran la vida alrededor de los caballos, desde la pesebrera hasta cada cabalgata,
                y que también reflejaran la personalidad de quien los usa.
              </p>
              <p className="not-italic font-body font-medium text-[#F9F7F4]">
                De ahí nació Equora.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="font-display text-2xl tracking-[4px] text-equora-amber">
                DISTINCIÓN. CARÁCTER. NOBLEZA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
