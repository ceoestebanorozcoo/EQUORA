'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Award, Palette, Heart, Shield } from 'lucide-react';

const pillars = [
  {
    icon: Award,
    title: 'Calidad',
    description: 'Cada material que usamos lo elegiríamos para nosotros mismos. Desde los aperos para sus ejemplares hasta los detalles que hacen de su pescebrera un espacio con distinción.',
  },
  {
    icon: Palette,
    title: 'Diseño Funcional',
    description: 'Todo lo que hacemos tiene un propósito. Que funcione, que dure y que se vea bien. Ya sea en el lomo de su caballo o colgado en la pared de su pescebrera.',
  },
  {
    icon: Heart,
    title: 'Comodidad',
    description: 'Un caballo cómodo rinde mejor. Un jinete cómodo disfruta más. Eso no es un extra, es el punto de partida.',
  },
  {
    icon: Shield,
    title: 'Estética',
    description: 'En el gremio equino, la presentación habla antes que uno, el detalle dice quién es usted. Equora cuida ese detalle como si fuera suyo.',
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
              PROPUESTA DE VALOR
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} direction="up" delay={i * 150} className="h-full">
              <div className="group h-full text-center p-4 md:p-8 rounded-2xl bg-equora-ivory/40 hover:bg-equora-ivory/60 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-equora-amber/10 flex items-center justify-center group-hover:bg-equora-amber/20 transition-colors duration-300">
                  <pillar.icon className="w-6 h-6 md:w-9 md:h-9 text-equora-amber" />
                </div>
                <h3 className="font-display text-sm md:text-xl tracking-wider text-equora-dark mb-2 md:mb-3">
                  {pillar.title.toUpperCase()}
                </h3>
                <p className="font-body text-equora-dark/60 text-xs md:text-sm leading-relaxed">
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
