'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    question: '¿Cuánto tarda en fabricarse mi pedido?',
    answer: '3 a 4 días hábiles. Los tiempos pueden variar en temporadas de alta demanda.',
  },
  {
    question: '¿A qué lugares hacen envíos?',
    answer: 'A todo el territorio colombiano, a través de Interrapidísimo.',
  },
  {
    question: '¿Cuánto cuesta el envío?',
    answer: 'El costo del envío es asumido por el cliente.',
  },
  {
    question: '¿Cuánto tarda en llegar mi pedido?',
    answer: '3 a 5 días hábiles después del despacho.',
  },
  {
    question: '¿Cómo pago?',
    answer: 'Transferencia bancaria. El pedido se confirma una vez verificado el pago.',
  },
  {
    question: '¿Tienen garantía los productos?',
    answer: 'Sí, 15 días calendario desde la entrega. Cubre defectos de fabricación y fallas estructurales por uso normal.',
  },
  {
    question: '¿Hacen cambios o devoluciones?',
    answer: 'No se realizan devoluciones por cambio de opinión. Los productos personalizados no tienen cambio salvo por defecto de fabricación. Tienes 2 días calendario desde la recepción para reportar inconformidades.',
  },
  {
    question: '¿Qué hago si mi producto llegó dañado?',
    answer: 'Repórtalo dentro de los 2 días calendario siguientes a la entrega con fotos o video del daño.',
  },
];

function FAQItem({ item, index }: { item: typeof faqItems[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal direction="up" delay={index * 60}>
      <div className={`
        rounded-xl border px-4 md:px-6 cursor-pointer
        transition-all duration-300
        ${open
          ? 'border-equora-amber/30 bg-white/5'
          : 'border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5'
        }
      `}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-5 text-left group"
          aria-expanded={open}
          aria-controls={`faq-answer-${index}`}
          id={`faq-question-${index}`}
        >
          <span className={`font-body font-medium pr-8 transition-colors duration-300 ${open ? 'text-equora-amber' : 'text-[#F9F7F4]/80 group-hover:text-white'}`}>
            {item.question}
          </span>
          <span className={`
            w-7 h-7 shrink-0 rounded-full flex items-center justify-center
            transition-all duration-300
            ${open ? 'bg-equora-amber rotate-180' : 'bg-white/8 group-hover:bg-white/15'}
          `}>
            <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${open ? 'text-white' : 'text-[#F9F7F4]/50'}`} aria-hidden="true" />
          </span>
        </button>

        <div
          id={`faq-answer-${index}`}
          role="region"
          aria-labelledby={`faq-question-${index}`}
          style={{
            maxHeight: open ? '400px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div className="pb-5 flex gap-3">
            <div className="w-px bg-equora-amber/30 shrink-0 mt-0.5" />
            <p className="font-body text-sm text-[#F9F7F4]/55 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-equora-navy py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-64 bg-equora-amber/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">

        <ScrollReveal direction="up">
          <div className="text-center mb-14">
            <p className="font-editorial text-equora-amber italic text-lg mb-3">
              Preguntas frecuentes
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider">
              ¿TIENES DUDAS?
            </h2>
            <div className="w-12 h-px bg-equora-amber/50 mx-auto mt-5" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-start">
          <div className="space-y-2">
            {faqItems.filter((_, i) => i % 2 === 0).map((item, i) => (
              <FAQItem key={i * 2} item={item} index={i * 2} />
            ))}
          </div>
          <div className="space-y-2">
            {faqItems.filter((_, i) => i % 2 !== 0).map((item, i) => (
              <FAQItem key={i * 2 + 1} item={item} index={i * 2 + 1} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
