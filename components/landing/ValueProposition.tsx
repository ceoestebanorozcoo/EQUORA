'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Award, Palette, Heart, Shield } from 'lucide-react';

const pillars = [
  {
    icon: Award,
    title: 'Calidad',
    description: 'Cuero seleccionado, costuras que duran años, herrajes que no se oxidan. Cada material pasa por nuestras manos.',
  },
  {
    icon: Palette,
    title: 'Diseño Funcional',
    description: 'Pensado para funcionar. Riendas que no resbalan, pellones que respetan al caballo, accesorios que te hacen sentir seguro.',
  },
  {
    icon: Heart,
    title: 'Comodidad',
    description: 'Ergonomía pensada para ti y tu caballo, cada pieza está diseñada para el bienestar, no solo para verse bien.',
  },
  {
    icon: Shield,
    title: 'Estética',
    description: 'Cada accesorio que usas refleja lo que te importa. Calidad, cuidado, atención al detalle.',
  },
];

export default function ValueProposition() {
  return (
    <section className="py-24 md:py-32 bg-white" aria-label="Propuesta de valor">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="font-editorial text-equora-amber italic text-lg mb-3">
              ¿Por qué EQUORA?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-equora-dark tracking-wider">
              NUESTRA PROPUESTA DE VALOR
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} direction="up" delay={i * 150} className="h-full">
              <div className="group h-full text-center p-8 rounded-2xl bg-equora-ivory/40 hover:bg-equora-ivory/60 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-equora-amber/10 flex items-center justify-center group-hover:bg-equora-amber/20 transition-colors duration-300">
                  <pillar.icon className="w-9 h-9 text-equora-amber" />
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
