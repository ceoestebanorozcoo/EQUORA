'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Gem, Flame, Crown } from 'lucide-react';

const values = [
  {
    icon: Gem,
    title: 'Distinción',
    description: 'La verdadera elegancia está en los detalles. Creamos productos que reflejan estilo, autenticidad y seguridad dentro del mundo equino.',
  },
  {
    icon: Flame,
    title: 'Carácter',
    description: 'Nace de la fuerza y la determinación que representan los caballos. Cada pieza transmite personalidad, presencia y pasión por este estilo de vida.',
  },
  {
    icon: Crown,
    title: 'Nobleza',
    description: 'Honramos la esencia del caballo — lealtad y grandeza — creando productos que reflejan respeto y conexión con estos ejemplares extraordinarios.',
  },
];

export default function BrandValues() {
  return (
    <section className="bg-white py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="font-editorial text-equora-amber italic text-lg mb-3">
              Lo que nos define
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-equora-dark tracking-wider">
              NUESTROS VALORES
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} direction="up" delay={i * 150} className="h-full">
              <div className="group h-full text-center p-7 md:p-10 rounded-3xl border border-gray-200/50 hover:border-equora-amber/30 bg-[#E7D6C2] hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="w-18 h-18 mx-auto mb-7 rounded-full bg-equora-amber/10 flex items-center justify-center group-hover:bg-equora-amber/20 transition-colors duration-300" style={{ width: 72, height: 72 }}>
                  <value.icon className="w-8 h-8 text-equora-amber" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl tracking-wider text-equora-dark mb-4">
                  {value.title.toUpperCase()}
                </h3>
                <p className="font-body text-[#6B7280] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
