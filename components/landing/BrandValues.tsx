'use client';

import { useEffect, useRef } from 'react';

const values = [
  {
    title: 'Distinción',
    body: 'En Equora creemos que la verdadera elegancia está en los detalles. Creamos productos que reflejan estilo, autenticidad y seguridad dentro del mundo equino.',
    number: '01',
  },
  {
    title: 'Carácter',
    body: 'Equora nace de la fuerza y la determinación que representan los caballos y quienes los aman. Cada pieza transmite personalidad, presencia y pasión por este estilo de vida.',
    number: '02',
  },
  {
    title: 'Nobleza',
    body: 'El caballo es símbolo de nobleza, lealtad y grandeza. En Equora honramos esa esencia creando productos que reflejan respeto y conexión con estos ejemplares extraordinarios.',
    number: '03',
  },
];

export default function BrandValues() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-equora-ivory py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="font-editorial italic text-equora-amber text-lg mb-3">Lo que nos define</p>
          <h2 className="font-display text-5xl md:text-6xl text-equora-dark tracking-wider">
            NUESTROS VALORES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="reveal group"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-lg transition-shadow border border-equora-ivory">
                <div className="font-display text-6xl text-equora-amber/20 mb-4 group-hover:text-equora-amber/40 transition-colors">
                  {v.number}
                </div>
                <h3 className="font-display text-3xl tracking-wider text-equora-dark mb-4">{v.title}</h3>
                <div className="w-12 h-0.5 bg-equora-amber mb-5" />
                <p className="font-editorial italic text-lg text-[#6B7280] leading-relaxed">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
