'use client';

import { useEffect, useRef, useState } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573043844516';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Start hero animations only after splash is done
    const handleSplashDone = () => setTimeout(() => setMounted(true), 80);
    window.addEventListener('splashDone', handleSplashDone);

    // Fallback: if splash already fired or page reloaded mid-session
    const fallback = setTimeout(() => setMounted(true), 2200);

    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(fallback);
      window.removeEventListener('splashDone', handleSplashDone);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const whatsappLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola, quiero conocer más sobre los productos de Equora')}`;

  // Helper: base transition + conditional visible/hidden state
  const anim = (delay: number, dir: 'up' | 'left' | 'fade' = 'fade') => ({
    style: { transitionDelay: `${delay}ms` },
    className: [
      'transition-all duration-700',
      dir === 'up'   && (mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'),
      dir === 'left' && (mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'),
      dir === 'fade' && (mounted ? 'opacity-100' : 'opacity-0'),
    ].filter(Boolean).join(' '),
  });

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="https://res.cloudinary.com/dybweubbo/image/upload/v1775884700/IMG_1129_dktmcz.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-equora-dark/60 via-equora-dark/30 to-equora-dark/5" aria-hidden="true" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-equora-amber/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Left accent line */}
      <div
        {...anim(600, 'fade')}
        className={`absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-equora-amber/30 to-transparent ${anim(600, 'fade').className}`}
        style={anim(600, 'fade').style}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 md:px-16 lg:px-24 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-2xl">

          {/* Badge */}
          <div
            className={`mb-8 ${anim(0, 'left').className}`}
            style={anim(0, 'left').style}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/30 bg-white/20 font-body text-[10px] tracking-widest text-[#4a2e1f] uppercase backdrop-blur-sm">
              Está en lo que haces… Y en lo que eliges.
            </span>
          </div>

          {/* Headline line 1 */}
          <div className={`overflow-hidden mb-1 ${anim(150, 'left').className}`} style={anim(150, 'left').style}>
            <span className="block font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white tracking-wide">
              Cada decisión
            </span>
          </div>

          {/* Headline line 2 */}
          <div className={`overflow-hidden mb-2 ${anim(280, 'left').className}`} style={anim(280, 'left').style}>
            <span className="block font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white tracking-wide">
              habla de ti…
            </span>
          </div>

          {/* Headline line 3 — italic */}
          <div className={`overflow-hidden mb-10 ${anim(400, 'left').className}`} style={anim(400, 'left').style}>
            <span
              className="block font-editorial italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-[#a67c52]"
            >
              incluso lo que usas todos los días.
            </span>
          </div>

          {/* Description with vertical amber line */}
          <div className={`flex items-stretch gap-4 mb-10 ${anim(520, 'up').className}`} style={anim(520, 'up').style}>
            <div className="w-px bg-equora-amber/50 shrink-0" />
            <p className="font-body text-sm text-white/70 leading-relaxed max-w-sm">
              Nosotros hacemos productos diseñados para acompañarte en cada momento, sin fallar cuando<br />más importa.
            </p>
          </div>

          {/* CTAs */}
          <div className={`flex flex-wrap gap-4 ${anim(640, 'up').className}`} style={anim(640, 'up').style}>
            <a
              href="/productos"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-equora-dark font-body font-semibold text-sm tracking-widest uppercase hover:bg-equora-ivory transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Ver productos
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-equora-dark text-white font-body font-semibold text-sm tracking-widest uppercase hover:bg-[#0d1e30] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-equora-dark/30"
            >
              <IoLogoWhatsapp size={19} aria-hidden="true" />
              Comprar
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
