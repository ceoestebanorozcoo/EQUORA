'use client';

import { useEffect, useState } from 'react';
import { FiShield, FiStar, FiTarget, FiAward } from 'react-icons/fi';

const benefits = [
    {
        icon: FiStar,
        title: 'Materiales Premium',
        description:
            'Cuero de primera selección, maderas nobles y acabados en latón. Solo utilizamos materiales que superan los estándares más exigentes del mundo ecuestre.',
    },
    {
        icon: FiShield,
        title: 'Durabilidad Excepcional',
        description:
            'Construidos para resistir el paso del tiempo y el uso diario. Cada producto está diseñado para ser una inversión que perdura generaciones.',
    },
    {
        icon: FiTarget,
        title: 'Funcionalidad Inteligente',
        description:
            'Diseño que resuelve problemas reales. Cada pieza cumple una función específica con eficiencia, sin sacrificar la estética ni la ergonomía.',
    },
    {
        icon: FiAward,
        title: 'Diseño Ergonómico',
        description:
            'Pensados para la comodidad del jinete y el bienestar del caballo. Ángulos, medidas y acabados que se adaptan a la perfección.',
    },
];

export default function Benefits() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        const el = document.getElementById('beneficios');
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="beneficios" className="py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-olive/60 text-xs tracking-[0.5em] uppercase mb-4 font-light">
                        Calidad sin compromisos
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cocoa mb-4">
                        ¿Por qué <span className="text-caramel italic">Equora</span>?
                    </h2>
                    <div className="mx-auto w-12 h-[1px] bg-golden/60 mt-4" />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={benefit.title}
                                className={`group relative bg-cream rounded-lg p-8 border border-golden/10 hover:border-golden/30 hover:shadow-lg hover:shadow-golden/5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}
                                style={{ transitionDelay: `${index * 120}ms` }}
                            >
                                <div className="flex items-start gap-5">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-golden/20 flex items-center justify-center group-hover:bg-golden/10 group-hover:border-golden/40 transition-all duration-500">
                                        <Icon className="text-xl text-caramel" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="font-display text-lg text-cocoa mb-2 group-hover:text-caramel transition-colors duration-300">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-sm text-olive/70 font-light leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Decorative corner */}
                                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-lg">
                                    <div className="absolute top-0 right-0 w-[1px] h-8 bg-golden/20 group-hover:bg-golden/40 transition-colors duration-500" />
                                    <div className="absolute top-0 right-0 h-[1px] w-8 bg-golden/20 group-hover:bg-golden/40 transition-colors duration-500" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
