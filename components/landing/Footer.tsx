'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Music2, Mail, Phone, MapPin } from 'lucide-react';
import { IoLogoInstagram, IoLogoWhatsapp, IoMail } from 'react-icons/io5';
import { useState } from 'react';
import TermsModal from './TermsModal';
import CookiesModal from './CookiesModal';
import PrivacyModal from './PrivacyModal';
import ConditionsModal from './ConditionsModal';

const INSTAGRAM_URL = 'https://www.instagram.com/equora___?igsh=MTZucTQxaW1najh2';
const TIKTOK_URL = 'https://www.tiktok.com/@equora___?_r=1&_t=ZS-95RQe30OBOv';
const EMAIL = 'equipo@equora.com.co';
const PHONE = '+573043844516';
const MAPS_URL = 'https://maps.google.com/?q=Medellín,Colombia';

export default function Footer() {
  const [termsOpen, setTermsOpen] = useState(false);
  const [cookiesOpen, setCookiesOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [conditionsOpen, setConditionsOpen] = useState(false);

  return (
    <>
      <footer id="footer" className="bg-equora-dark border-t border-[#E7D6C2]/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="group flex items-center gap-3 mb-2 w-fit cursor-pointer transition-transform duration-300 hover:scale-105">
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-equora-amber/10 border border-equora-amber/25 overflow-hidden flex items-center justify-center shrink-0 group-hover:border-equora-amber/50 transition-colors duration-300">
                  <Image src="/logo.svg" alt="EQUORA" width={48} height={48} className="object-contain p-2" />
                </div>
                <h2 className="font-display text-2xl md:text-4xl tracking-[6px] text-white group-hover:text-equora-amber transition-colors duration-300">EQUORA</h2>
              </Link>
              <div className="flex gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#E7D6C2]/20 flex items-center justify-center text-[#E7D6C2]/60 hover:border-equora-amber hover:text-equora-amber transition-colors duration-300"
                  aria-label="Instagram de EQUORA"
                >
                  <IoLogoInstagram size={16} aria-hidden="true" />
                </a>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#E7D6C2]/20 flex items-center justify-center text-[#E7D6C2]/60 hover:border-equora-amber hover:text-equora-amber transition-colors duration-300"
                  aria-label="TikTok de EQUORA"
                >
                  <Music2 className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="w-10 h-10 rounded-full border border-[#E7D6C2]/20 flex items-center justify-center text-[#E7D6C2]/60 hover:border-equora-amber hover:text-equora-amber transition-colors duration-300"
                  aria-label="Correo de EQUORA"
                >
                  <IoMail size={16} aria-hidden="true" />
                </a>
                <a
                  href={`https://wa.me/${PHONE}?text=${encodeURIComponent('Hola, me gustaría obtener más información sobre los productos de EQUORA.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#E7D6C2]/20 flex items-center justify-center text-[#E7D6C2]/60 hover:border-equora-amber hover:text-equora-amber transition-colors duration-300"
                  aria-label="WhatsApp de EQUORA"
                >
                  <IoLogoWhatsapp size={16} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Tienda */}
            <div>
              <h4 className="font-display text-sm tracking-widest text-equora-amber mb-5 uppercase">
                Tienda
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Inicio', href: '/' },
                  { label: 'Productos', href: '/productos' },
                  { label: 'Categorías', href: '/categorias' },
                  { label: 'Nosotros', href: '/#historia' },
                  { label: 'FAQ', href: '/#faq' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="relative group inline-block font-body text-sm text-[#E7D6C2]/50 hover:text-equora-amber transition-colors duration-300 py-0.5"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-equora-amber group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Información Legal */}
            <div>
              <h4 className="font-display text-sm tracking-widest text-equora-amber mb-5 uppercase">
                Información Legal
              </h4>
              <ul className="space-y-3">
                {['Política de privacidad', 'Términos', 'Condiciones', 'Cookies'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => item === 'Cookies' ? setCookiesOpen(true) : item === 'Política de privacidad' ? setPrivacyOpen(true) : item === 'Condiciones' ? setConditionsOpen(true) : setTermsOpen(true)}
                      className="relative group font-body text-sm text-[#E7D6C2]/50 hover:text-equora-amber transition-colors duration-300 cursor-pointer text-left py-0.5"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-equora-amber group-hover:w-full transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-display text-sm tracking-widest text-equora-amber mb-5 uppercase">
                Contacto
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group flex items-center gap-3 font-body text-sm text-[#E7D6C2]/50 hover:text-equora-amber transition-colors duration-300"
                    aria-label="Enviar correo a EQUORA"
                  >
                    <Mail className="w-4 h-4 text-equora-amber shrink-0" aria-hidden="true" />
                    <span className="relative py-0.5">
                      {EMAIL}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-equora-amber group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${PHONE}`}
                    className="group flex items-center gap-3 font-body text-sm text-[#E7D6C2]/50 hover:text-equora-amber transition-colors duration-300"
                    aria-label="Llamar a EQUORA"
                  >
                    <Phone className="w-4 h-4 text-equora-amber shrink-0" aria-hidden="true" />
                    <span className="relative py-0.5">
                      (+57) 3043844516
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-equora-amber group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 font-body text-sm text-[#E7D6C2]/50 hover:text-equora-amber transition-colors duration-300"
                    aria-label="Ver ubicación en Google Maps"
                  >
                    <MapPin className="w-4 h-4 text-equora-amber shrink-0" aria-hidden="true" />
                    <span className="relative py-0.5">
                      Medellín, Colombia
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-equora-amber group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#E7D6C2]/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-[#E7D6C2]/30">
              © 2026 EQUORA. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 w-16 bg-equora-amber/30" />
              <p className="font-display text-xs tracking-[0.25em] text-equora-amber/70">
                DISTINCIÓN · CARÁCTER · NOBLEZA
              </p>
              <div className="h-px flex-1 w-16 bg-equora-amber/30" />
            </div>
          </div>
        </div>
      </footer>

      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
      <CookiesModal isOpen={cookiesOpen} onClose={() => setCookiesOpen(false)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <ConditionsModal isOpen={conditionsOpen} onClose={() => setConditionsOpen(false)} />
    </>
  );
}
