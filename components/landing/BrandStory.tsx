'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BrandStory() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        const el = document.getElementById('historia');
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="historia" className="py-24 md:py-32 bg-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* ── Image ── */}
                    <div
                        className={`relative transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                            }`}
                    >
                        <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl shadow-cocoa/20">
                            <Image
                                src="/brand-story.jpg"
                                alt="Artesanía ecuestre Equora"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/30 to-transparent" />
                        </div>

                        {/* Decorative frame */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-golden/30 rounded-tl-lg" />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-golden/30 rounded-br-lg" />

                        {/* Stats badge */}
                        <div className="absolute bottom-6 right-6 bg-cocoa/90 backdrop-blur-sm px-5 py-3 rounded-sm border border-golden/20">
                            <p className="font-display text-2xl text-golden">100%</p>
                            <p className="text-golden/60 text-[10px] tracking-[0.25em] uppercase font-light">
                                Artesanal
                            </p>
                        </div>
                    </div>

                    {/* ── Content ── */}
                    <div
                        className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                            }`}
                    >
                        {/* Label */}
                        <p className="text-olive/60 text-xs tracking-[0.5em] uppercase mb-4 font-light">
                            Nuestra historia
                        </p>

                        {/* Title */}
                        <h2 className="font-display text-3xl md:text-4xl text-cocoa leading-tight mb-6">
                            Nacimos de la pasión
                            <br />
                            <span className="text-caramel italic">por lo auténtico</span>
                        </h2>

                        {/* Divider */}
                        <div className="w-12 h-[1px] bg-golden/60 mb-8" />

                        {/* Story */}
                        <div className="space-y-5 text-olive/80 font-light leading-relaxed text-sm md:text-base">
                            <p>
                                Equora nació de un sueño compartido: crear productos ecuestres que honren
                                la nobleza del caballo y la tradición de quienes viven por y para él.
                                Cada pieza lleva consigo el aroma del cuero recién trabajado, la calidez
                                de la madera pulida y la precisión de manos que entienden que <strong className="text-cocoa font-medium">la artesanía
                                    es un acto de amor</strong>.
                            </p>
                            <p>
                                Nuestra misión es elevar la experiencia ecuestre a través del diseño, la
                                funcionalidad y la belleza. No fabricamos en serie — <strong className="text-cocoa font-medium">creamos piezas con alma</strong>,
                                pensadas para quienes reconocen que la verdadera elegancia está en los detalles.
                            </p>
                            <p>
                                Desde percheros que transforman espacios hasta riendas que se funden con
                                las manos del jinete, cada producto Equora es una declaración de principios:
                                la calidad no es un lujo, es un compromiso.
                            </p>
                        </div>

                        {/* Mission & Vision */}
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="border-l-2 border-golden/40 pl-5">
                                <h4 className="font-display text-sm text-cocoa tracking-wider uppercase mb-2">
                                    Misión
                                </h4>
                                <p className="text-xs text-olive/70 font-light leading-relaxed">
                                    Diseñar productos ecuestres que fusionen artesanía, funcionalidad y
                                    estética premium para quienes viven con pasión el mundo ecuestre.
                                </p>
                            </div>
                            <div className="border-l-2 border-golden/40 pl-5">
                                <h4 className="font-display text-sm text-cocoa tracking-wider uppercase mb-2">
                                    Visión
                                </h4>
                                <p className="text-xs text-olive/70 font-light leading-relaxed">
                                    Ser la marca ecuestre referente en Colombia, reconocida por su excelencia
                                    artesanal y su compromiso con la nobleza de la tradición.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
