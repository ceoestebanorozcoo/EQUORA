'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { IoMenu, IoClose, IoBagHandleOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Categorías', href: '/categorias' },
  { label: 'Nosotros', href: '/nosotros' },
];

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

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
  const router = useRouter();
  const isLanding = pathname === '/';

  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const lastScrollY = useRef(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        setSearchOpen(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery('');
        setResults([]);
      }
    };
    if (searchOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [searchOpen]);

  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(q)}`);
      const json = await res.json();
      setResults((json.data || []).slice(0, 6));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchResults(val), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    setResults([]);
    router.push(`/productos?search=${encodeURIComponent(query.trim())}`);
    setQuery('');
  };

  const handleProductClick = (id: string) => {
    setSearchOpen(false);
    setQuery('');
    setResults([]);
    router.push(`/producto/${id}`);
  };

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
        <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-8 md:px-12 flex items-center justify-between gap-4">

          {/* Logo — hidden when search open on mobile */}
          <a
            href="/"
            className={`flex items-center gap-2.5 group transition-all duration-300 hover:scale-105 shrink-0 ${searchOpen ? 'hidden md:flex' : 'flex'}`}
            aria-label="EQUORA — Inicio"
          >
            <EquoraLogo />
            <span className="font-display text-2xl tracking-[5px] text-white group-hover:text-equora-amber transition-colors duration-200">
              EQUORA
            </span>
          </a>

          {/* Search bar (expands, hides links) */}
          <div
            ref={searchRef}
            className={`transition-all duration-400 flex items-center gap-3 ${searchOpen ? 'flex-1 max-w-2xl' : 'w-0 overflow-hidden'}`}
          >
            {searchOpen && (
              <form onSubmit={handleSubmit} className="relative w-full">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleQueryChange}
                  placeholder="Buscar productos..."
                  className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-white placeholder-white/40 font-body text-sm outline-none focus:border-equora-amber/60 transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  aria-label="Buscar"
                >
                  <IoSearchOutline size={18} />
                </button>

                {/* Results dropdown */}
                {(results.length > 0 || (loading && query)) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-equora-dark/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 backdrop-blur-sm">
                    {loading && results.length === 0 ? (
                      <p className="px-5 py-4 text-white/40 font-body text-sm">Buscando...</p>
                    ) : results.length === 0 ? (
                      <p className="px-5 py-4 text-white/40 font-body text-sm">Sin resultados</p>
                    ) : (
                      results.map((p) => (
                        <button
                          key={p._id}
                          type="button"
                          onClick={() => handleProductClick(p._id)}
                          className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors duration-150 text-left border-b border-white/5 last:border-0"
                        >
                          {p.images?.[0] && (
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
                              <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-white text-sm truncate">{p.name}</p>
                            <p className="font-body text-equora-amber text-xs mt-0.5">
                              ${p.price.toLocaleString('es-CO')}
                            </p>
                          </div>
                        </button>
                      ))
                    )}
                    {results.length > 0 && (
                      <button
                        type="button"
                        onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                        className="w-full px-5 py-3 text-center font-body text-equora-amber/80 hover:text-equora-amber text-sm transition-colors duration-150 hover:bg-white/5"
                      >
                        Ver todos los resultados para &ldquo;{query}&rdquo;
                      </button>
                    )}
                  </div>
                )}
              </form>
            )}
            {searchOpen && (
              <button
                onClick={() => { setSearchOpen(false); setQuery(''); setResults([]); }}
                className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-white/10 hover:bg-equora-amber/20 border border-white/20 hover:border-equora-amber/50 text-white/80 hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Cerrar búsqueda"
              >
                <IoClose size={18} />
              </button>
            )}
          </div>

          {/* Links + CTA + icons */}
          <div className={`flex items-center gap-6 transition-all duration-300 ${searchOpen ? 'hidden md:flex' : 'flex'}`}>
            {/* Desktop links — hidden when search open */}
            <ul className={`hidden md:flex items-center gap-10 transition-all duration-300 ${searchOpen ? 'md:hidden' : ''}`} role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="font-body text-base text-white/80 hover:text-white transition-colors duration-200 relative group py-1"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Search icon */}
            {!searchOpen && (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-4 h-9 rounded-full bg-white/10 hover:bg-equora-amber/20 border border-white/20 hover:border-equora-amber/50 text-white/80 hover:text-white transition-all duration-200 cursor-pointer font-body text-sm"
                aria-label="Buscar"
              >
                <IoSearchOutline size={18} />
                Buscar
              </button>
            )}

            {/* CTA desktop — hidden when search open */}
            {!searchOpen && (
              <a
                href="/productos"
                className="hidden md:flex items-center gap-2 px-4 h-9 rounded-full bg-white/10 hover:bg-equora-amber/20 border border-white/20 hover:border-equora-amber/50 text-white/80 hover:text-white transition-all duration-200 font-body text-sm"
              >
                <IoBagHandleOutline size={17} />
                Comprar
              </a>
            )}

            {/* Mobile burger */}
            {!searchOpen && (
              <button
                className="md:hidden text-white cursor-pointer p-1 z-60 relative"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
              </button>
            )}
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
              className="inline-flex items-center gap-2 px-4 h-9 rounded-full bg-white/10 hover:bg-equora-amber/20 border border-white/20 hover:border-equora-amber/50 text-white/80 hover:text-white transition-all duration-200 font-body text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <IoBagHandleOutline size={19} />
              Comprar
            </a>
          </li>
        </ul>

        <div className="px-6 pb-10">
          <p className="font-editorial italic text-white/20 text-sm">
            Equipamiento equino de alta calidad.
          </p>
        </div>
      </div>
    </>
  );
}
