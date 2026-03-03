'use client';

import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
    {
        question: '¿De qué materiales están hechos los productos Equora?',
        answer:
            'Utilizamos exclusivamente cuero de primera selección, maderas nobles como el roble y el nogal, herrajes en latón macizo y acabados artesanales. Cada material pasa por un riguroso proceso de selección para garantizar la máxima calidad y durabilidad.',
    },
    {
        question: '¿Cómo puedo realizar un pedido?',
        answer:
            'Puedes hacer tu pedido directamente a través de WhatsApp. Selecciona el producto que deseas en nuestra colección, haz clic en "Comprar por WhatsApp" y te guiaremos en todo el proceso de compra. También puedes escribirnos para pedidos personalizados.',
    },
    {
        question: '¿Realizan envíos a todo el país?',
        answer:
            'Sí, realizamos envíos a toda Colombia a través de transportadoras de confianza. Empacamos cada producto con el mayor cuidado para que llegue en perfectas condiciones. Los tiempos de entrega varían según la ubicación.',
    },
    {
        question: '¿Puedo solicitar un producto personalizado?',
        answer:
            'Absolutamente. Realizamos productos personalizados bajo pedido. Contáctanos por WhatsApp con tu idea y nuestro equipo de artesanos evaluará la viabilidad y te enviará una cotización. Grabados, medidas especiales y combinaciones de materiales están disponibles.',
    },
    {
        question: '¿Cuál es la garantía de los productos?',
        answer:
            'Todos los productos Equora cuentan con garantía por defectos de fabricación. Nuestro compromiso es que cada pieza supere tus expectativas. Si un producto presenta algún defecto, contáctanos y lo resolveremos a la brevedad.',
    },
    {
        question: '¿Cómo debo cuidar mis productos de cuero?',
        answer:
            'Recomendamos limpiar con un paño suave y seco, aplicar crema de cuero cada 3-6 meses, evitar exposición prolongada al sol y almacenar en un lugar seco y ventilado. Con el cuidado adecuado, tus productos Equora mejorarán con el paso del tiempo.',
    },
];

function FAQItem({ question, answer, index, visible }: {
    question: string;
    answer: string;
    index: number;
    visible: boolean;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`border-b border-golden/15 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-6 text-left group"
            >
                <span className="font-display text-base md:text-lg text-cocoa group-hover:text-caramel transition-colors duration-300 pr-4">
                    {question}
                </span>
                <FiChevronDown
                    className={`flex-shrink-0 text-olive/40 group-hover:text-caramel transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'
                        }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-60 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                    }`}
            >
                <p className="text-sm text-olive/70 font-light leading-relaxed max-w-3xl">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default function FAQ() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        const el = document.getElementById('faq');
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="faq" className="py-24 md:py-32 bg-cream">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-olive/60 text-xs tracking-[0.5em] uppercase mb-4 font-light">
                        Resolvemos tus dudas
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cocoa mb-4">
                        Preguntas <span className="text-caramel italic">frecuentes</span>
                    </h2>
                    <div className="mx-auto w-12 h-[1px] bg-golden/60 mt-4" />
                </div>

                {/* Accordion */}
                <div className="border-t border-golden/15">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            index={index}
                            visible={visible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
