'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <section id="inicio" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* ── Background Image ── */}
            <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] ease-out ${loaded ? 'scale-100' : 'scale-110'
                    }`}
                style={{ backgroundImage: "url('/hero.jpg')" }}
            />

            {/* ── Overlays ── */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-cocoa/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* ── Content ── */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Decorative line */}
                <div
                    className={`mx-auto w-16 h-[1px] bg-golden/60 mb-8 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 w-16' : 'opacity-0 w-0'
                        }`}
                />

                {/* Subtitle */}
                <p
                    className={`text-golden/80 text-xs tracking-[0.5em] uppercase mb-6 font-light transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    Artesanía ecuestre de distinción
                </p>

                {/* Headline */}
                <h1
                    className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}
                >
                    Donde la tradición
                    <br />
                    <span className="text-golden italic">se encuentra</span>
                    <br />
                    con la nobleza
                </h1>

                {/* Description */}
                <p
                    className={`text-cream/60 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed mb-10 transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    Cada pieza Equora nace de la pasión por el caballo y el respeto por la artesanía.
                    Diseñamos para quienes entienden que la elegancia es un lenguaje.
                </p>

                {/* CTA Button */}
                <div
                    className={`transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    <a
                        href="#coleccion"
                        className="
              inline-block
              px-10 py-4
              border border-golden/40
              text-golden
              text-xs tracking-[0.4em] uppercase
              font-light
              bg-golden/5
              backdrop-blur-sm
              rounded-sm
              hover:bg-golden/15
              hover:border-golden/70
              hover:shadow-lg hover:shadow-golden/10
              transition-all duration-500
              group
            "
                    >
                        Descubrir Colección
                        <span className="inline-block ml-3 transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </a>
                </div>
            </div>

            {/* ── Scroll Indicator ── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-golden/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-golden/40" />
            </div>
        </section>
    );
}
