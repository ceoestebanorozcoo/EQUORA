'use client';

import { useEffect, useRef } from 'react';

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Materiales Seleccionados',
    description: 'Madera, metal tratado, seda y textiles de alta resistencia para mayor durabilidad.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Durabilidad Garantizada',
    description: 'Fabricados para resistir el uso diario en pesebreras, cabalgatas y competencias.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    title: 'Ergonomía Animal',
    description: 'Diseño que respeta la anatomía del caballo, garantizando comodidad y seguridad.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
    title: 'Seguridad Certificada',
    description: 'Productos revisados y aprobados antes de cada despacho para tu tranquilidad.',
  },
];

const comparison = [
  { feature: 'Materiales premium', generic: false, equora: true },
  { feature: 'Diseño personalizado', generic: false, equora: true },
  { feature: 'Garantía de fabricación', generic: false, equora: true },
  { feature: 'Atención personalizada', generic: false, equora: true },
  { feature: 'Envío a todo Colombia', generic: true, equora: true },
  { feature: 'Estética profesional', generic: false, equora: true },
];

export default function TechnicalBenefits() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="font-editorial italic text-equora-amber text-lg mb-3">Beneficios</p>
          <h2 className="font-display text-5xl md:text-6xl text-equora-dark tracking-wider">
            HECHO CON CRITERIO
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="reveal group p-6 rounded-2xl border border-gray-100 hover:border-equora-amber/30 hover:shadow-lg transition-all"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-equora-amber mb-4">{b.icon}</div>
              <h3 className="font-display text-lg tracking-wide text-equora-dark mb-2">{b.title}</h3>
              <p className="font-body text-sm text-[#6B7280] leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="max-w-2xl mx-auto reveal">
          <h3 className="font-display text-2xl tracking-wider text-equora-dark text-center mb-8">
            GENÉRICO vs EQUORA
          </h3>
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full" role="table">
              <thead>
                <tr className="bg-equora-dark">
                  <th className="text-left py-4 px-6 font-body text-sm text-[#6B7280] font-normal" scope="col">Característica</th>
                  <th className="py-4 px-6 font-body text-sm text-[#6B7280] font-normal text-center" scope="col">Genérico</th>
                  <th className="py-4 px-6 font-display text-sm text-equora-amber tracking-wider text-center" scope="col">EQUORA</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9F7F4]'}>
                    <td className="py-4 px-6 font-body text-sm text-[#0D0D0D]">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {row.generic ? (
                        <span className="text-green-500 text-lg" aria-label="Sí">✓</span>
                      ) : (
                        <span className="text-gray-300 text-lg" aria-label="No">✗</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-equora-amber text-lg font-bold" aria-label="Sí">✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
