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
    description: 'Honramos la esencia del caballo "lealtad y grandeza" creando productos que reflejan respeto y conexión con estos ejemplares extraordinarios.',
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto items-stretch">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} direction="up" delay={i * 150} className={`h-full${values.length % 2 !== 0 && i === values.length - 1 ? ' col-span-2 md:col-span-1 w-full' : ''}`}>
              <div className="group h-full text-center p-4 md:p-10 rounded-2xl md:rounded-3xl border border-gray-200/50 hover:border-equora-amber/30 bg-[#E7D6C2] hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="mx-auto mb-4 md:mb-7 rounded-full bg-equora-amber/10 flex items-center justify-center group-hover:bg-equora-amber/20 transition-colors duration-300" style={{ width: 48, height: 48 }} >
                  <value.icon className="w-5 h-5 md:w-8 md:h-8 text-equora-amber" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-sm md:text-2xl tracking-wider text-equora-dark mb-2 md:mb-4">
                  {value.title.toUpperCase()}
                </h3>
                <p className="font-body text-[#6B7280] text-xs md:text-sm leading-relaxed">
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
