'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
                    ? 'bg-cocoa/95 backdrop-blur-xl shadow-2xl shadow-cocoa/20'
                    : 'bg-gradient-to-b from-black/60 to-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* ── Logo ── */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-15 h-15 transition-transform duration-500 group-hover:scale-115">
                        <Image
                            src="/logo.svg"
                            alt="Equora"
                            fill
                            className="object-contain brightness-0 invert opacity-90 group-hover:opacity-120 transition-opacity duration-300"
                            priority
                        />
                    </div>
                    <span className="text-3xl font-display text-golden tracking-[0.25em] group-hover:text-golden-light transition-colors duration-300">
                        EQUORA
                    </span>
                </Link>

                {/* ── Desktop Links ── */}
                <div className="hidden md:flex items-center gap-10">
                    {[
                        { label: 'Inicio', href: '#inicio' },
                        { label: 'Colección', href: '#coleccion' },
                        { label: 'Contacto', href: '#contacto' },
                    ].map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            className="relative text-golden/70 hover:text-golden text-xs tracking-[0.3em] uppercase font-light transition-colors duration-300 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-golden/50 after:transition-all after:duration-500 hover:after:w-full"
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* ── Mobile Menu Button ── */}
                <button
                    className="md:hidden text-golden/80 hover:text-golden transition-colors duration-300"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* ── Mobile Menu ── */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-cocoa/95 backdrop-blur-xl px-6 pb-6 pt-2 border-t border-golden/10">
                    {[
                        { label: 'Inicio', href: '#inicio' },
                        { label: 'Colección', href: '#coleccion' },
                        { label: 'Contacto', href: '#contacto' },
                    ].map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            className="block py-3 text-golden/70 hover:text-golden transition-colors duration-300 text-sm tracking-[0.25em] uppercase font-light"
                            onClick={() => setMenuOpen(false)}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
