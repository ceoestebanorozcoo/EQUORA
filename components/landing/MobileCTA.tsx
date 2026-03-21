'use client';

import { IoLogoWhatsapp } from 'react-icons/io5';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573043844516';

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-equora-dark/95 navbar-blur border-t border-white/10 px-4 py-3 flex gap-3">
      <button
        onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
        className="flex-1 py-3 bg-equora-amber text-white rounded-full font-body text-sm font-medium cursor-pointer hover:bg-[#7A4820] transition-colors"
        aria-label="Ver colección completa"
      >
        Ver Colección
      </button>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-full font-body text-sm font-medium cursor-pointer hover:bg-green-600 transition-colors"
        aria-label="Contactar por WhatsApp"
      >
        <IoLogoWhatsapp size={18} aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}
