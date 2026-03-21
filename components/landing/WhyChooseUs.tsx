'use client';

import { useEffect, useRef } from 'react';

export default function WhyChooseUs() {
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
    <section className="bg-equora-dark py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <p className="font-editorial italic text-equora-amber text-lg mb-3">Razones para elegirnos</p>
          <h2 className="font-display text-5xl md:text-6xl text-[#F9F7F4] tracking-wider">
            ¿POR QUÉ EQUORA?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="reveal-left space-y-6" style={{ transitionDelay: '100ms' }}>
            {[
              'Equora nace desde una conexión real con el mundo equino. Cada producto está pensado desde la experiencia de quienes viven el día a día entre caballos, pesebreras y cabalgatas.',
              'Cuidamos los detalles porque sabemos que en el gremio caballista son los detalles los que marcan la diferencia. Por eso creamos productos que combinan funcionalidad, calidad y personalidad.',
              'Muchas de nuestras piezas son personalizadas, permitiendo que cada caballo y cada caballista tengan algo que refleje su propia identidad.',
              'Equora está hecha para quienes valoran la presencia, el carácter y los detalles que hacen especial cada momento alrededor de los caballos.',
            ].map((text, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-equora-amber" aria-hidden="true" />
                <p className="font-body text-[#F9F7F4]/80 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="reveal-right flex justify-center" style={{ transitionDelay: '200ms' }}>
            <div className="relative w-72 h-72">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full border border-equora-amber/20 animate-pulse" />
              <div className="absolute inset-8 rounded-full border border-equora-amber/30" />
              <div className="absolute inset-16 rounded-full bg-equora-amber/10 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-4xl text-equora-amber">100%</p>
                  <p className="font-body text-xs text-[#F9F7F4]/60 tracking-widest uppercase mt-1">
                    Hecho con
                    <br />
                    pasión
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
