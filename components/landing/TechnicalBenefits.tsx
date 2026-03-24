'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import { Check, X } from 'lucide-react';

const pillars = [
  {
    title: 'Materiales de alto nivel',
    description: 'Seleccionados para resistir uso continuo y condiciones reales.',
  },
  {
    title: 'Diseño funcional',
    description: 'Pensado para adaptarse bien, verse limpio y rendir sin incomodar.',
  },
  {
    title: 'Construcción precisa',
    description: 'Acabados firmes, costuras seguras y detalles bien resueltos.',
  },
  {
    title: 'Confiabilidad total',
    description: 'Equipo que responde igual hoy, mañana y con el tiempo.',
  },
];

const comparisons = [
  { generic: 'Material estándar',       equora: 'Materiales seleccionados' },
  { generic: 'Producción masiva',       equora: 'Fabricación cuidada' },
  { generic: 'Ajustes básicos',         equora: 'Ajuste funcional' },
  { generic: 'Durabilidad limitada',    equora: 'Uso prolongado' },
  { generic: 'Apariencia',             equora: 'Rendimiento real' },
];

export default function TechnicalBenefits() {
  return (
    <section className="bg-equora-dark py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left */}
          <ScrollReveal direction="left">
            <div>
              <p className="font-editorial text-equora-amber italic text-lg mb-3">
                La diferencia EQUORA
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider mb-6 leading-tight">
                CALIDAD QUE SE NOTA.<br />RENDIMIENTO QUE SE SIENTE.
              </h2>
              <div className="space-y-3 font-body text-[#F9F7F4]/60 leading-relaxed mb-10 text-[15px]">
                <p>
                  En EQUORA no trabajamos para que se vea bien…<br />
                  trabajamos para que <span className="text-[#F9F7F4]/90">funcione mejor, dure más</span> y responda cuando realmente importa.
                </p>
                <p>
                  Cada producto está diseñado para el uso real: jornadas largas, exigencia constante y cero margen para fallos.
                </p>
                <p className="font-editorial italic text-white text-base">
                  Porque en este mundo, lo genérico no aguanta.
                </p>
              </div>

              {/* Pillars grid 2x2 */}
              <p className="font-display text-xs tracking-widest text-[#F9F7F4]/30 uppercase mb-5">
                Lo que nos define
              </p>
              <div className="grid grid-cols-2 gap-4">
                {pillars.map((p) => (
                  <div key={p.title} className="p-4 rounded-xl bg-equora-navy/50 flex flex-col gap-2">
                    <p className="font-body font-semibold text-[#F9F7F4]/90 text-sm">{p.title}</p>
                    <p className="font-body text-[#F9F7F4]/45 text-xs leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal direction="right">
            <div className="bg-equora-navy/50 rounded-2xl p-8">
              <h3 className="font-display text-2xl tracking-wider text-white text-center mb-2">
                GENÉRICO VS EQUORA
              </h3>
              <p className="font-body text-center text-[#F9F7F4]/40 text-sm mb-8 leading-relaxed">
                La diferencia no está en lo que prometen…<br />
                está en cómo responden cuando los usas.
              </p>

              {/* Header */}
              <div className="flex justify-between items-center mb-3 px-1">
                <span className="font-display text-xs tracking-widest text-[#F9F7F4]/30 uppercase">Característica</span>
                <div className="flex gap-6">
                  <span className="font-display text-xs tracking-widest text-[#F9F7F4]/30 uppercase w-16 text-center">Otro</span>
                  <span className="font-display text-xs tracking-widest text-equora-amber uppercase w-16 text-center">EQUORA</span>
                </div>
              </div>

              <div className="space-y-1">
                {comparisons.map((item) => (
                  <div
                    key={item.generic}
                    className="flex items-center justify-between py-3 border-b border-[#F9F7F4]/10"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-body text-xs text-[#F9F7F4]/35 line-through">{item.generic}</span>
                      <span className="font-body text-sm text-[#F9F7F4]/80">{item.equora}</span>
                    </div>
                    <div className="flex gap-6 shrink-0 ml-4">
                      <span className="w-16 flex justify-center">
                        <X className="w-4 h-4 text-red-400/50" aria-hidden="true" />
                      </span>
                      <span className="w-16 flex justify-center">
                        <Check className="w-4 h-4 text-equora-amber" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-editorial italic text-white text-sm text-center mt-8 leading-relaxed">
                EQUORA es simple:<br />hacer las cosas bien desde el inicio.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
