'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573043844516';
const WHATSAPP_MSG = encodeURIComponent('Hola, quiero conocer más sobre los productos de Equora');

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-equora-ivory px-6" aria-label="Llamada a la acción">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl overflow-hidden bg-equora-navy p-12 md:p-20 text-center">
            <div className="relative z-10">
              <p className="font-editorial text-equora-amber italic text-lg mb-4">
                ¿Listo para elevar tu experiencia?
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-white tracking-wider mb-6">
                COMIENZA TU HISTORIA<br />CON EQUORA
              </h2>
              <p className="font-body text-[#F9F7F4]/60 max-w-xl mx-auto mb-10">
                Descubre la colección completa y encuentra la pieza perfecta para ti y tu caballo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-equora-amber hover:bg-[#8a5224] text-white rounded-full font-body font-medium text-sm tracking-widest uppercase transition-colors duration-300"
                >
                  Comprar ahora
                </Link>
                <Link
                  href="/productos"
                  className="px-8 py-4 border border-white/40 text-white rounded-full font-body font-medium text-sm tracking-widest uppercase hover:border-white hover:bg-white/10 transition-colors duration-300"
                >
                  Explorar colección
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
