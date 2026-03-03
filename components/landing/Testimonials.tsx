'use client';

import { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
    {
        name: 'Carlos Mendoza',
        role: 'Hacienda El Porvenir',
        text: 'Los percheros Equora transformaron por completo la estética de nuestra caballeriza. Es artesanía pura, se nota en cada detalle. Mis invitados siempre preguntan por la marca.',
        initials: 'CM',
    },
    {
        name: 'Valentina Restrepo',
        role: 'Jinete profesional',
        text: 'Busqué por años productos ecuestres que combinaran funcionalidad con elegancia. Equora lo logra de manera impecable. Las riendas son una obra de arte.',
        initials: 'VR',
    },
    {
        name: 'Andrés Gutiérrez',
        role: 'Club Ecuestre La Reserva',
        text: 'Desde que equipamos nuestras instalaciones con Equora, el ambiente cambió completamente. Es lujo accesible con calidad que realmente perdura.',
        initials: 'AG',
    },
    {
        name: 'María José Herrera',
        role: 'Criadora de caballos',
        text: 'Cada producto que he comprado ha superado mis expectativas. La atención al detalle es extraordinaria, y el servicio al cliente es igual de premium que sus productos.',
        initials: 'MH',
    },
];

export default function Testimonials() {
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        const el = document.getElementById('testimonios');
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((c) => (c + 1) % testimonials.length);

    return (
        <section id="testimonios" className="py-24 md:py-32 bg-cocoa relative overflow-hidden">
            {/* Subtle bg pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8D1A7'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-golden/50 text-xs tracking-[0.5em] uppercase mb-4 font-light">
                        Quienes nos eligen
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
                        Voces de <span className="text-golden italic">confianza</span>
                    </h2>
                    <div className="mx-auto w-12 h-[1px] bg-golden/40 mt-4" />
                </div>

                {/* Testimonial Carousel */}
                <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="relative">
                        {/* Quote */}
                        <div className="text-center px-4 md:px-12">
                            <FaQuoteLeft className="text-golden/20 text-3xl mx-auto mb-8" />

                            <div className="min-h-[120px] flex items-center justify-center">
                                <p className="font-display text-lg md:text-xl lg:text-2xl text-cream/80 italic leading-relaxed transition-opacity duration-500">
                                    &ldquo;{testimonials[current].text}&rdquo;
                                </p>
                            </div>

                            {/* Author */}
                            <div className="mt-8 flex flex-col items-center gap-3">
                                {/* Avatar (initials) */}
                                <div className="w-14 h-14 rounded-full bg-caramel/30 border border-golden/20 flex items-center justify-center">
                                    <span className="text-golden font-display text-lg">
                                        {testimonials[current].initials}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-golden text-sm font-medium tracking-wider">
                                        {testimonials[current].name}
                                    </p>
                                    <p className="text-golden/40 text-xs font-light tracking-wider mt-0.5">
                                        {testimonials[current].role}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-center gap-6 mt-10">
                            <button
                                onClick={prev}
                                className="w-10 h-10 rounded-full border border-golden/20 flex items-center justify-center text-golden/50 hover:text-golden hover:border-golden/50 transition-all duration-300"
                            >
                                <FiChevronLeft />
                            </button>

                            {/* Dots */}
                            <div className="flex gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrent(index)}
                                        className={`transition-all duration-500 rounded-full ${index === current
                                                ? 'w-6 h-1.5 bg-golden'
                                                : 'w-1.5 h-1.5 bg-golden/30 hover:bg-golden/50'
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="w-10 h-10 rounded-full border border-golden/20 flex items-center justify-center text-golden/50 hover:text-golden hover:border-golden/50 transition-all duration-300"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
