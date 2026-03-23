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
    <div
      className={`border rounded-xl px-6 transition-colors duration-300 ${
        open ? 'border-equora-amber/30' : 'border-equora-dark/10'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="font-body font-medium text-equora-dark group-hover:text-equora-amber transition-colors duration-300 pr-8">
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-equora-dark/40 shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180 text-equora-amber' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        style={{
          maxHeight: open ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
        }}
      >
        <p className="pb-5 font-body text-sm text-equora-dark/50 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-equora-ivory py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="font-editorial text-equora-amber italic text-lg mb-3">
              Preguntas frecuentes
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-equora-dark tracking-wider">
              ¿TIENES DUDAS?
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
