'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import { Check, X } from 'lucide-react';

const comparisons = [
  { feature: 'Cuero premium italiano', generic: false, equora: true },
  { feature: 'Diseño ergonómico certificado', generic: false, equora: true },
  { feature: 'Costuras reforzadas a mano', generic: false, equora: true },
  { feature: 'Garantía de por vida', generic: false, equora: true },
  { feature: 'Materiales hipoalergénicos', generic: false, equora: true },
  { feature: 'Ajuste personalizado', generic: false, equora: true },
];

export default function TechnicalBenefits() {
  return (
    <section className="bg-equora-dark py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <p className="font-editorial text-equora-amber italic text-lg mb-3">
                La diferencia EQUORA
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider mb-6">
                MATERIALES QUE<br />MARCAN LA DIFERENCIA
              </h2>
              <p className="font-body text-[#F9F7F4]/60 leading-relaxed mb-8">
                Cada producto EQUORA es el resultado de años de investigación en materiales,
                ergonomía y durabilidad. No hacemos compromisos porque tu caballo tampoco los hace.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Durabilidad', value: '10x' },
                  { label: 'Ergonomía', value: 'A+' },
                  { label: 'Seguridad', value: '100%' },
                  { label: 'Confort', value: 'Superior' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl bg-equora-navy/50">
                    <p className="font-display text-3xl text-equora-amber">{stat.value}</p>
                    <p className="font-body text-[#F9F7F4]/50 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="bg-equora-navy/50 rounded-2xl p-8">
              <h3 className="font-display text-2xl tracking-wider text-white text-center mb-8">
                GENÉRICO VS EQUORA
              </h3>
              <div className="space-y-4">
                {comparisons.map((item) => (
                  <div
                    key={item.feature}
                    className="flex items-center justify-between py-3 border-b border-[#F9F7F4]/10"
                  >
                    <span className="font-body text-sm text-[#F9F7F4]/70">
                      {item.feature}
                    </span>
                    <div className="flex gap-8">
                      <span className="w-8 flex justify-center">
                        <X className="w-5 h-5 text-red-400/60" aria-hidden="true" />
                      </span>
                      <span className="w-8 flex justify-center">
                        <Check className="w-5 h-5 text-equora-amber" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end gap-8 pt-2">
                  <span className="w-8 text-center font-body text-xs text-[#F9F7F4]/40">Otro</span>
                  <span className="w-8 text-center font-body text-xs text-equora-amber">EQUORA</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
