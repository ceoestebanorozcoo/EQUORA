'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { IoMenu, IoClose, IoBagHandleOutline } from 'react-icons/io5';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Categorías', href: '/categorias' },
  { label: 'Nosotros', href: '/#historia' },
  { label: 'FAQ', href: '/#faq' },
];

function EquoraLogo() {
  return (
    <div className="relative h-12 w-12 rounded-full bg-equora-amber/10 border border-equora-amber/25 overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-equora-amber/50 shrink-0">
      <Image
        src="/logo.svg"
        alt="EQUORA"
        fill
        className="object-contain p-2"
        priority
      />
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setAtTop(currentY < 10);
      if (currentY < 10) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 4) {
        setVisible(false);
        setMenuOpen(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparent = isLanding && atTop;

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('/#')) return;
    if (isLanding) {
      e.preventDefault();
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          transparent && !menuOpen
            ? 'bg-transparent py-7'
            : 'navbar-blur bg-equora-dark/90 shadow-lg py-5'
        }`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-8 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-105"
            aria-label="EQUORA — Inicio"
          >
            <EquoraLogo />
            <span className="font-display text-2xl tracking-[5px] text-white group-hover:text-equora-amber transition-colors duration-200">
              EQUORA
            </span>
          </a>

          {/* Links + CTA + burger */}
          <div className="flex items-center gap-6">
            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-10" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="font-body text-base text-white/80 hover:text-white transition-colors duration-200 relative group py-1"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-equora-amber group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA desktop */}
            <a
              href="/productos"
              className="hidden md:flex items-center gap-2 bg-equora-amber hover:bg-[#0d1e30] text-white font-body text-base font-medium px-6 py-3 rounded-full transition-colors duration-200"
            >
              <IoBagHandleOutline size={17} />
              Comprar
            </a>

            {/* Mobile burger */}
            <button
              className="md:hidden text-white cursor-pointer p-1 z-60 relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-55 bg-equora-dark flex flex-col md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Top bar inside overlay */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <a href="/" className="flex items-center gap-2.5 group" onClick={() => setMenuOpen(false)}>
            <EquoraLogo />
            <span className="font-display text-2xl tracking-[5px] text-white">EQUORA</span>
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer p-1"
            aria-label="Cerrar menú"
          >
            <IoClose size={28} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col px-6 pt-6 gap-1 flex-1" role="list">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`block font-body text-2xl text-white/70 hover:text-equora-amber transition-all duration-200 py-4 border-b border-white/8 ${
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
                onClick={(e) => { handleAnchorClick(e, link.href); setMenuOpen(false); }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-8">
            <a
              href="/productos"
              className="inline-flex items-center gap-2.5 bg-equora-amber text-white font-body font-medium px-7 py-3.5 rounded-full text-base"
              onClick={() => setMenuOpen(false)}
            >
              <IoBagHandleOutline size={19} />
              Comprar
            </a>
          </li>
        </ul>

        {/* Bottom brand */}
        <div className="px-6 pb-10">
          <p className="font-editorial italic text-white/20 text-sm">
            Equipamiento equino de alta calidad.
          </p>
        </div>
      </div>
    </>
  );
}
