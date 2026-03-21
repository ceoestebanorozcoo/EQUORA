'use client';

import { useEffect, useRef } from 'react';
import Accordion from '@/components/ui/Accordion';

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

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-equora-dark py-24 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="font-editorial italic text-equora-amber text-lg mb-3">Resolvemos tus dudas</p>
          <h2 className="font-display text-5xl md:text-6xl text-[#F9F7F4] tracking-wider">
            PREGUNTAS
            <br />FRECUENTES
          </h2>
        </div>

        <div className="reveal" style={{ transitionDelay: '150ms' }}>
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
