'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const testimonials = [
  {
    text: 'Los productos de Equora tienen algo diferente, se les ve el cuidado en los detalles y también la calidad. En la pesebrera todo se ve mucho más organizado y elegante.',
    author: 'Andrés M.',
    stars: 5,
  },
  {
    text: 'Compré unas riendas personalizadas y quedé muy contenta. Mucha gente en las cabalgatas me pregunta de dónde son.',
    author: 'Laura R.',
    stars: 5,
  },
  {
    text: 'Me gustó mucho porque son cosas que realmente se necesitan. El perchero para el sombrero me ayudó a que no se me siguieran dañando los sombreros.',
    author: 'Felipe G.',
    stars: 5,
  },
  {
    text: 'A los caballos les dejaron de dar cólicos y de hacer desorden con el heno gracias a los comederos.',
    author: 'Camila S.',
    stars: 5,
  },
  {
    text: 'Equora tiene ese tipo de productos que uno no ve mucho en el mercado y que son detalles que hacen que todo se vea mejor y más organizado.',
    author: 'Juan P.',
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} estrellas`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-equora-amber" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (!paused) {
      timerRef.current = setInterval(next, 5000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  return (
    <section
      className="bg-equora-ivory py-24 px-6"
      aria-label="Testimonios de clientes"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-editorial italic text-equora-amber text-lg mb-3">Lo que dicen</p>
          <h2 className="font-display text-5xl md:text-6xl text-equora-dark tracking-wider">
            TESTIMONIOS
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card */}
          <div className="bg-white rounded-2xl p-10 shadow-sm text-center transition-all duration-300">
            <Stars count={testimonials[current].stars} />
            <blockquote className="font-editorial italic text-xl md:text-2xl text-[#0D0D0D] my-6 leading-relaxed">
              &ldquo;{testimonials[current].text}&rdquo;
            </blockquote>
            <cite className="font-body font-medium text-equora-amber not-italic tracking-wide">
              — {testimonials[current].author}
            </cite>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-equora-amber text-equora-amber flex items-center justify-center hover:bg-equora-amber hover:text-white transition-colors cursor-pointer"
              aria-label="Testimonio anterior"
            >
              <IoChevronBack size={18} aria-hidden="true" />
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Navegación testimonios">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonio ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === current ? 'bg-equora-amber w-6' : 'bg-equora-amber/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-equora-amber text-equora-amber flex items-center justify-center hover:bg-equora-amber hover:text-white transition-colors cursor-pointer"
              aria-label="Testimonio siguiente"
            >
              <IoChevronForward size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
