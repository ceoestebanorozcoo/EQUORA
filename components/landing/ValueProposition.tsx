'use client';

import { useEffect, useState } from 'react';
import { GiHorseshoe, GiLeatherArmor, GiDiamondTrophy, GiHandOk } from 'react-icons/gi';

const pillars = [
    {
        icon: GiHorseshoe,
        title: 'Nobleza',
        description:
            'Cada producto refleja la majestuosidad y el espíritu indomable del caballo. Creamos para quienes honran la relación entre jinete y corcel.',
    },
    {
        icon: GiLeatherArmor,
        title: 'Artesanía',
        description:
            'Manos expertas transforman los mejores materiales en piezas que cuentan historias. La tradición artesanal vive en cada puntada.',
    },
    {
        icon: GiDiamondTrophy,
        title: 'Distinción',
        description:
            'Nuestro diseño habla sin palabras. Líneas elegantes, acabados impecables y una estética que eleva cualquier espacio ecuestre.',
    },
    {
        icon: GiHandOk,
        title: 'Confianza',
        description:
            'Calidad que se siente al primer contacto. Materiales nobles y construcción sólida que garantizan años de uso y satisfacción.',
    },
];

export default function ValueProposition() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        const section = document.getElementById('propuesta-valor');
        if (section) observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="propuesta-valor" className="py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-olive/60 text-xs tracking-[0.5em] uppercase mb-4 font-light">
                        Nuestros pilares
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cocoa mb-4">
                        Lo que nos <span className="text-caramel italic">define</span>
                    </h2>
                    <div className="mx-auto w-12 h-[1px] bg-golden/60 mt-4" />
                </div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {pillars.map((pillar, index) => {
                        const Icon = pillar.icon;
                        return (
                            <div
                                key={pillar.title}
                                className={`text-center group transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Icon */}
                                <div className="mx-auto w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-6 border border-golden/20 group-hover:border-golden/50 group-hover:bg-golden/10 transition-all duration-500">
                                    <Icon className="text-2xl text-caramel group-hover:text-wine transition-colors duration-500" />
                                </div>

                                {/* Title */}
                                <h3 className="font-display text-xl text-cocoa mb-3 group-hover:text-caramel transition-colors duration-300">
                                    {pillar.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-olive/70 font-light leading-relaxed max-w-xs mx-auto">
                                    {pillar.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
