'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Check, X } from 'lucide-react';

const pillars = [
  { title: 'Materiales que resisten' },
  { title: 'Diseño que funciona' },
  { title: 'Construcción precisa' },
  { title: 'Confiabilidad constante' },
];

const comparisons = [
  { generic: 'Meses',       equora: 'Años',          label: 'Durabilidad' },
  { generic: 'Constante',   equora: 'Ninguno',        label: 'Mantenimiento' },
  { generic: 'Dudas',       equora: 'Seguridad',      label: 'Confiabilidad' },
  { generic: 'Impersonal',  equora: 'Personalizada',  label: 'Atención' },
  { generic: 'Frustración', equora: 'Satisfacción',   label: 'Resultado' },
];

export default function TechnicalBenefits() {
  const [hoveredRow, setHoveredRow]       = useState<string | null>(null);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  return (
    <section className="bg-equora-navy py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-equora-amber/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-equora-amber/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">

        {/* ── Header ── */}
        <ScrollReveal direction="up">
          <p className="font-editorial text-equora-amber italic text-lg mb-3">
            La diferencia EQUORA
          </p>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-wider leading-tight mb-3">
            CALIDAD QUE SE NOTA.<br />RENDIMIENTO QUE RESPONDE.
          </h2>
          <div className="w-12 h-px bg-equora-amber mb-16" />
        </ScrollReveal>

        {/* ── Row 1: Description + Table ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch mb-16">

          {/* LEFT */}
          <div className="flex flex-col justify-center gap-8">
            <ScrollReveal direction="left" delay={0}>
              <div className="space-y-5 font-body text-[#F9F7F4]/55 leading-relaxed text-base sm:text-xl md:text-2xl lg:text-3xl">
                <p>
                  No hacemos productos para verse bien.<br />
                  Los hacemos para{' '}
                  <span className="text-[#F9F7F4]/85 font-medium">durar, adaptarse y rendir sin fallar.</span>
                </p>
                <p>
                  Diseñados para uso real: exigencia diaria,<br />
                  jornadas largas y cero margen de error.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={180}>
              <div className="flex items-stretch gap-4">
                <div className="w-px bg-equora-amber/40 shrink-0" />
                <p className="font-editorial italic text-white/55 text-base sm:text-xl md:text-2xl lg:text-3xl">
                  Porque lo genérico no aguanta.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: Comparison table */}
          <ScrollReveal direction="right" delay={100}>
            <div className="group rounded-2xl border border-white/8 overflow-hidden h-full flex flex-col transition-all duration-500 hover:border-white/15 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]">

              {/* Header */}
              <div className="grid grid-cols-3 px-4 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-5 bg-white/3">
                <span className="font-display text-xs sm:text-sm tracking-widest text-[#F9F7F4]/20 uppercase" />
                <span className="font-display text-xs sm:text-sm tracking-widest text-[#F9F7F4]/30 uppercase">Otros</span>
                <span className="font-display text-xs sm:text-sm tracking-widest text-equora-amber uppercase">EQUORA</span>
              </div>
              <div className="h-px bg-white/8 mx-4 sm:mx-8" />

              {/* Rows */}
              <div className="flex flex-col flex-1 px-4 sm:px-8 py-1">
                {comparisons.map((item, i) => (
                  <div
                    key={item.label}
                    className={`
                      grid grid-cols-3 items-center py-3 sm:py-5 border-b border-white/6 cursor-default
                      transition-all duration-300
                      ${hoveredRow === item.label
                        ? 'bg-white/4 px-2 sm:px-3 rounded-lg -mx-2 sm:-mx-3'
                        : ''
                      }
                    `}
                    style={{ transitionDelay: hoveredRow === item.label ? '0ms' : `${i * 20}ms` }}
                    onMouseEnter={() => setHoveredRow(item.label)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <span className={`font-display text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase transition-colors duration-300 ${hoveredRow === item.label ? 'text-[#F9F7F4]/70' : 'text-[#F9F7F4]/30'}`}>
                      {item.label}
                    </span>
                    <div className="flex items-center gap-1.5 sm:gap-3">
                      <X className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 transition-colors duration-300 ${hoveredRow === item.label ? 'text-red-400/70' : 'text-red-400/25'}`} />
                      <span className={`font-body text-xs sm:text-base line-through transition-colors duration-300 ${hoveredRow === item.label ? 'text-[#F9F7F4]/35' : 'text-[#F9F7F4]/20'}`}>{item.generic}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-3">
                      <Check className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 transition-all duration-300 ${hoveredRow === item.label ? 'text-equora-amber scale-110' : 'text-equora-amber/50'}`} />
                      <span className={`font-body text-xs sm:text-base font-medium transition-colors duration-300 ${hoveredRow === item.label ? 'text-white' : 'text-[#F9F7F4]/65'}`}>
                        {item.equora}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="h-px bg-white/8 mx-4 sm:mx-8" />
              <div className="text-center px-4 sm:px-8 py-5 sm:py-6">
                <p className="font-display text-xs tracking-widest text-equora-amber uppercase mb-1">EQUORA</p>
                <p className="font-body text-[#F9F7F4]/50 text-sm">Bien hecho desde el principio.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Separator ── */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-6 mb-14">
            <div className="flex-1 h-px bg-white/8" />
            <div className="w-1.5 h-1.5 rounded-full bg-equora-amber/40" />
            <div className="flex-1 h-px bg-white/8" />
          </div>
        </ScrollReveal>

        {/* ── Quote ── */}
        <ScrollReveal direction="up" delay={0}>
          <p className="font-display text-[#F9F7F4]/80 text-2xl md:text-3xl leading-snug tracking-wider text-center mb-12 max-w-3xl mx-auto uppercase">
            No vendemos cosas.<br />
            Resolvemos problemas.<br />
            Los que vives cada día con tu caballo.
          </p>
        </ScrollReveal>

        {/* ── Pillars ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} direction="up" delay={i * 100}>
              <div
                className={`
                  flex items-center gap-5 p-8 rounded-xl border cursor-default
                  transition-all duration-400 ease-out
                  ${hoveredPillar === p.title
                    ? 'bg-equora-amber/8 border-equora-amber/25 -translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
                    : 'bg-white/3 border-white/6'
                  }
                `}
                onMouseEnter={() => setHoveredPillar(p.title)}
                onMouseLeave={() => setHoveredPillar(null)}
              >
                <span className={`
                  w-9 h-9 shrink-0 rounded-full flex items-center justify-center
                  transition-all duration-400
                  ${hoveredPillar === p.title
                    ? 'bg-equora-amber/25 scale-110'
                    : 'bg-equora-amber/12'
                  }
                `}>
                  <Check className={`w-5 h-5 transition-colors duration-400 ${hoveredPillar === p.title ? 'text-equora-amber' : 'text-equora-amber/70'}`} />
                </span>
                <p className={`font-body font-medium text-lg transition-colors duration-400 ${hoveredPillar === p.title ? 'text-[#F9F7F4]/90' : 'text-[#F9F7F4]/60'}`}>
                  {p.title}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
