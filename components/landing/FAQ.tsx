'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ChevronDown } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
  list?: string[];
  ordered?: boolean;
};

const faqItems: FAQItem[] = [
  {
    question: '¿Qué tipo de productos ofrece Equora?',
    answer: 'En Equora ofrecemos productos relacionados con el mundo equino que brindan funcionalidad y una excelente experiencia para nuestros clientes.',
  },
  {
    question: '¿Los productos son de buena calidad?',
    answer: 'Sí. En Equora trabajamos con estándares de calidad y seleccionamos cada producto pensando en la durabilidad, comodidad y seguridad para el cliente y el entorno equino.',
  },
  {
    question: '¿Hacen envíos a todo el país?',
    answer: 'Sí, realizamos envíos a todo el país.',
  },
  {
    question: '¿Cuánto tiempo tarda el envío?',
    answer: 'El envío normalmente tarda entre 3 y 5 días hábiles, dependiendo de la ciudad y la disponibilidad del producto.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos diferentes métodos de pago como:',
    list: ['Transferencias', 'Pagos digitales'],
  },
  {
    question: '¿Puedo hacer cambios o devoluciones?',
    answer: 'Sí, puedes solicitar cambios en caso de que el producto llegue con algún defecto o problema. Nuestro equipo te acompañará en todo el proceso para darte una solución rápida.',
  },
  {
    question: '¿Cómo puedo hacer un pedido?',
    answer: 'Puedes hacer tu pedido de forma sencilla:',
    list: ['Elige el producto', 'Escríbenos por WhatsApp', 'Confirmamos disponibilidad', 'Realizas el pago', 'Recibes tu pedido'],
    ordered: true,
  },
  {
    question: '¿Equora ofrece asesoría antes de comprar?',
    answer: 'Sí. En Equora te asesoramos para que elijas el producto que mejor se adapte a tus necesidades.',
  },
  {
    question: '¿Cómo puedo contactar a Equora?',
    answer: 'Puedes contactarnos a través de:',
    list: ['WhatsApp', 'TikTok', 'Instagram'],
  },
  {
    question: '¿Equora trabaja con caballistas principiantes?',
    answer: 'Sí. Equora está pensada tanto para personas que ya hacen parte del gremio equino como para quienes están empezando y quieren aprender y adquirir productos confiables.',
  },
];

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
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
          <span className={`font-body font-medium pr-8 transition-colors duration-300 ${open ? 'text-equora-amber' : 'text-[#E7D6C2]/80 group-hover:text-white'}`}>
            {item.question}
          </span>
          <span className={`
            w-7 h-7 shrink-0 rounded-full flex items-center justify-center
            transition-all duration-300
            ${open ? 'bg-equora-amber rotate-180' : 'bg-white/8 group-hover:bg-white/15'}
          `}>
            <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${open ? 'text-white' : 'text-[#E7D6C2]/50'}`} aria-hidden="true" />
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
            <div className="font-body text-sm text-[#E7D6C2]/55 leading-relaxed space-y-2">
              <p>{item.answer}</p>
              {item.list && (
                item.ordered ? (
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    {item.list.map((li, i) => <li key={i}>{li}</li>)}
                  </ol>
                ) : (
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    {item.list.map((li, i) => <li key={i}>{li}</li>)}
                  </ul>
                )
              )}
            </div>
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
