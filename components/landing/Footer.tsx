'use client';

import { useState } from 'react';
import { IoLogoInstagram, IoLogoTiktok, IoLogoWhatsapp, IoCall } from 'react-icons/io5';
import TermsModal from './TermsModal';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573043844516';

export default function Footer() {
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <footer id="footer" className="bg-equora-dark border-t border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h2 className="font-display text-3xl tracking-[6px] text-equora-amber mb-3">EQUORA</h2>
              <p className="font-editorial italic text-[#F9F7F4]/60 text-lg leading-relaxed">
                &ldquo;Lujo que no necesita explicación.&rdquo;
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-body font-medium text-[#F9F7F4] mb-4 text-sm tracking-widest uppercase">
                Síguenos
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#F9F7F4]/60 hover:text-equora-amber transition-colors font-body text-sm cursor-pointer"
                  aria-label="Instagram de EQUORA"
                >
                  <IoLogoInstagram size={18} aria-hidden="true" />
                  Instagram
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#F9F7F4]/60 hover:text-equora-amber transition-colors font-body text-sm cursor-pointer"
                  aria-label="TikTok de EQUORA"
                >
                  <IoLogoTiktok size={18} aria-hidden="true" />
                  TikTok
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#F9F7F4]/60 hover:text-equora-amber transition-colors font-body text-sm cursor-pointer"
                  aria-label="WhatsApp de EQUORA"
                >
                  <IoLogoWhatsapp size={18} aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-body font-medium text-[#F9F7F4] mb-4 text-sm tracking-widest uppercase">
                Contacto
              </h3>
              <a
                href="tel:3043844516"
                className="flex items-center gap-3 text-[#F9F7F4]/60 hover:text-equora-amber transition-colors font-body text-sm cursor-pointer mb-4"
                aria-label="Llamar a EQUORA"
              >
                <IoCall size={18} aria-hidden="true" />
                3043844516
              </a>
              <div className="space-y-2">
                <button
                  onClick={() => setTermsOpen(true)}
                  className="text-[#F9F7F4]/40 hover:text-equora-amber transition-colors font-body text-xs cursor-pointer block"
                >
                  Términos y Condiciones
                </button>
                <span className="text-[#F9F7F4]/40 font-body text-xs">
                  Políticas de privacidad
                </span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-[#F9F7F4]/30">
              © 2026 EQUORA. Todos los derechos reservados.
            </p>
            <p className="font-editorial italic text-[#F9F7F4]/30 text-sm">
              Distinción. Carácter. Nobleza.
            </p>
          </div>
        </div>
      </footer>

      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
}
