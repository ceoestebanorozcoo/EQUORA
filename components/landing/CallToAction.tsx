'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function CallToAction() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.2 }
        );
        const el = document.getElementById('cta-section');
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573043844516'}?text=${encodeURIComponent('Hola, me interesa conocer la colección Equora. ¿Podrían asesorarme?')}`;

    return (
        <section id="cta-section" className="relative py-28 md:py-36 overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: "url('/hero.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-cocoa/90 via-cocoa/85 to-cocoa/90" />

            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E8D1A7' fill-rule='evenodd'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill-opacity='1'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px',
            }} />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                {/* Decorative line */}
                <div className={`mx-auto w-16 h-[1px] bg-golden/50 mb-8 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`} />

                <p className={`text-golden/60 text-xs tracking-[0.5em] uppercase mb-6 font-light transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Eleva tu experiencia ecuestre
                </p>

                <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl text-cream leading-tight mb-6 transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    La excelencia no se busca,
                    <br />
                    <span className="text-golden italic">se elige</span>
                </h2>

                <p className={`text-cream/50 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed mb-10 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Descubre una colección diseñada para quienes entienden que cada detalle importa.
                    Contáctanos y permítenos ser parte de tu historia ecuestre.
                </p>

                <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              inline-flex items-center justify-center gap-3
              px-10 py-4
              bg-golden/15 border border-golden/40
              text-golden
              text-xs tracking-[0.3em] uppercase font-light
              rounded-sm
              hover:bg-golden/25 hover:border-golden/70
              hover:shadow-lg hover:shadow-golden/10
              transition-all duration-500
              group
            "
                    >
                        <FaWhatsapp className="text-lg transition-transform duration-300 group-hover:scale-110" />
                        Contáctanos por WhatsApp
                    </a>

                    <a
                        href="#coleccion"
                        className="
              inline-flex items-center justify-center
              px-10 py-4
              border border-cream/20
              text-cream/70
              text-xs tracking-[0.3em] uppercase font-light
              rounded-sm
              hover:border-cream/40 hover:text-cream
              transition-all duration-500
            "
                    >
                        Ver Colección
                    </a>
                </div>
            </div>
        </section>
    );
}
