'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import { Award, Palette, Heart, Shield } from 'lucide-react';

const pillars = [
  {
    icon: Award,
    title: 'Calidad Premium',
    description: 'Materiales seleccionados a mano, cuero de primera calidad y acabados impecables.',
  },
  {
    icon: Palette,
    title: 'Diseño Funcional',
    description: 'Cada pieza es diseñada para equilibrar belleza y rendimiento en la pista.',
  },
  {
    icon: Heart,
    title: 'Comodidad Equina',
    description: 'Ergonomía pensada para el bienestar del caballo en cada detalle.',
  },
  {
    icon: Shield,
    title: 'Estética Profesional',
    description: 'Presencia y estilo que reflejan tu compromiso con la excelencia.',
  },
];

export default function ValueProposition() {
  return (
    <section className="py-24 md:py-32 bg-equora-ivory" aria-label="Propuesta de valor">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="font-editorial text-equora-amber italic text-lg mb-3">
              ¿Por qué EQUORA?
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-equora-dark tracking-wider">
              PILARES DE NUESTRA MARCA
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} direction="up" delay={i * 150}>
              <div className="group text-center p-8 rounded-2xl bg-equora-cream/50 hover:bg-equora-cream transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-equora-amber/10 flex items-center justify-center group-hover:bg-equora-amber/20 transition-colors duration-300">
                  <pillar.icon className="w-7 h-7 text-equora-amber" />
                </div>
                <h3 className="font-display text-xl tracking-wider text-equora-dark mb-3">
                  {pillar.title}
                </h3>
                <p className="font-body text-equora-dark/60 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
