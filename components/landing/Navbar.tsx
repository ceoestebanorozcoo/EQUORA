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
    <div className="relative h-10 w-10 rounded-full bg-equora-amber/10 border border-equora-amber/25 overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-equora-amber/50 shrink-0">
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        transparent
          ? 'bg-transparent py-5'
          : 'navbar-blur bg-equora-dark/90 shadow-lg py-3'
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-screen-2xl mx-auto w-full px-8 flex items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-105"
          aria-label="EQUORA — Inicio"
        >
          <EquoraLogo />
          <span className="font-display text-xl tracking-[5px] text-white group-hover:text-equora-amber transition-colors duration-200">
            EQUORA
          </span>
        </a>

        {/* Links + CTA + burger agrupados a la derecha */}
        <div className="flex items-center gap-6">
          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="font-body text-sm text-white/80 hover:text-white transition-colors duration-200 relative group py-1"
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
            className="hidden md:flex items-center gap-2 bg-equora-amber hover:bg-[#8a5224] text-white font-body text-sm font-medium px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            <IoBagHandleOutline size={17} />
            Comprar
          </a>

          {/* Mobile burger */}
          <button
            className="md:hidden text-white cursor-pointer p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-equora-dark/95 navbar-blur border-t border-white/10">
          <ul className="flex flex-col py-4 px-6 gap-4" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-body text-white/80 hover:text-equora-amber transition-colors block py-2"
                  onClick={(e) => { handleAnchorClick(e, link.href); setMenuOpen(false); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/productos"
                className="flex items-center gap-2 bg-equora-amber text-white font-body text-sm font-medium px-5 py-2.5 rounded-full w-fit mt-2"
                onClick={() => setMenuOpen(false)}
              >
                <IoBagHandleOutline size={17} />
                Comprar
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
