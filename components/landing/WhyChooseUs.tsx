'use client';

import { ScrollReveal } from '@/components/ScrollReveal';

const reasons = [
  {
    number: '01',
    title: 'Conexión real con el mundo equino',
    description: 'Cada producto está pensado desde la experiencia de quienes viven el día a día entre caballos, pesebreras y cabalgatas.',
  },
  {
    number: '02',
    title: 'Los detalles marcan la diferencia',
    description: 'Creamos productos que combinan funcionalidad, calidad y personalidad — porque en el gremio caballista los detalles hablan.',
  },
  {
    number: '03',
    title: 'Piezas personalizadas',
    description: 'Cada caballo y cada caballista pueden tener algo que refleje su propia identidad, con opciones hechas a medida.',
  },
  {
    number: '04',
    title: 'Presencia y carácter',
    description: 'Para quienes valoran los detalles que hacen especial cada momento alrededor de los caballos.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-equora-ivory px-6 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-equora-amber/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-20">
            <p className="font-editorial text-equora-amber italic text-lg mb-4 tracking-wide">
              Hecha con pasión
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-equora-dark tracking-wider">
              ¿RAZONES PARA ELEGIRNOS?
            </h2>
            <div className="w-16 h-0.5 bg-equora-amber mx-auto mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.number} direction="up" delay={i * 120}>
              <div className="group relative pl-16">
                {/* Number */}
                <span className="absolute left-0 top-0 font-display text-4xl text-equora-amber/40 group-hover:text-equora-amber transition-colors duration-500">
                  {reason.number}
                </span>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-equora-dark mb-3 group-hover:text-equora-amber transition-colors duration-500">
                    {reason.title.toUpperCase()}
                  </h3>
                  <p className="font-body text-equora-dark/60 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
                {/* Bottom line */}
                <div className="mt-6 h-px bg-equora-dark/10 group-hover:bg-equora-amber/30 transition-colors duration-500" />
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
