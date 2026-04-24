'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const reasons = [
  {
    number: '01',
    title: 'Vivimos lo que vendemos',
    description: 'Cada producto nació de andar entre caballos, pescebreras y cabalgatas. No lo imaginamos, lo vivimos.',
  },
  {
    number: '02',
    title: 'El detalle es nuestro sello',
    description: 'En el gremio equino, quien sabe mirar, nota la diferencia. Nosotros la ponemos en cada pieza.',
  },
  {
    number: '03',
    title: 'Hecho para usted, pensado con usted',
    description: 'Sus colores, su estilo, su identidad. Cada pieza personalizada es suya desde el primer detalle.',
  },
  {
    number: '04',
    title: 'Porque ningún momento con su caballo es ordinario',
    description: 'Una feria, una cabalgata, un domingo en la pescebrera. Para Equora todos esos momentos son especiales y nuestros productos están hechos para estarlo también.',
  },
];

export default function WhyChooseUs() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 bg-white px-6 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-equora-amber/30 to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        <ScrollReveal direction="up">
          <div className="text-center mb-20">
            <p className="font-editorial text-equora-amber italic text-lg mb-4 tracking-wide">
              Hecha con pasión
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-equora-dark tracking-wider">
              ¿RAZONES PARA ELEGIRNOS?
            </h2>
            <div className="w-16 h-0.5 bg-equora-amber mx-auto mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.number} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 120} className="h-full">
              <div
                className={`
                  relative overflow-hidden h-full p-6 md:p-8 rounded-2xl border cursor-default
                  transition-all duration-500 ease-out
                  ${hovered === reason.number
                    ? 'bg-[#1a2d45] border-[#1a2d45] shadow-lg -translate-y-1'
                    : 'bg-white border-equora-dark/10 shadow-sm'
                  }
                `}
                onMouseEnter={() => setHovered(reason.number)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Animated amber bar */}
                <div
                  className="absolute left-0 top-0 w-0.75 bg-equora-amber transition-all duration-500 ease-out"
                  style={{ height: hovered === reason.number ? '100%' : '0%' }}
                />

                <div className="flex items-start gap-6">
                  {/* Number */}
                  <span className={`
                    font-display text-4xl md:text-5xl leading-none transition-all duration-500 shrink-0
                    ${hovered === reason.number ? 'text-equora-amber' : 'text-equora-amber/25'}
                  `}>
                    {reason.number}
                  </span>

                  <div className="pt-1 w-full">
                    <h3 className={`font-display text-lg tracking-wider mb-3 transition-colors duration-500 ${hovered === reason.number ? 'text-white' : 'text-equora-dark'}`}>
                      {reason.title.toUpperCase()}
                    </h3>
                    <div className={`h-px mb-3 w-full transition-colors duration-500 ${hovered === reason.number ? 'bg-white/20' : 'bg-equora-dark/10'}`} />
                    <p className={`font-body text-sm leading-relaxed transition-colors duration-500 ${hovered === reason.number ? 'text-white/65' : 'text-equora-dark/55'}`}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-equora-amber/30 to-transparent" />
    </section>
  );
}
