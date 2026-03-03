'use client';

import Image from 'next/image';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contacto" className="bg-cocoa text-golden/70">
            {/* ── Main Footer ── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative w-20 h-20">
                                <Image
                                    src="/logo.svg"
                                    alt="Equora"
                                    fill
                                    className="object-contain brightness-0 invert opacity-80"
                                />
                            </div>
                            <span className="text-xl font-display text-golden tracking-[0.25em]">
                                EQUORA
                            </span>
                        </div>
                        <p className="text-sm font-light leading-relaxed max-w-xs">
                            Artesanía ecuestre de distinción. Diseñamos cada pieza con la
                            pasión por el caballo y el respeto por la tradición.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-golden text-xs tracking-[0.3em] uppercase mb-6 font-light">
                            Navegación
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Inicio', href: '#inicio' },
                                { label: 'Colección', href: '#coleccion' },
                                { label: 'Contacto', href: '#contacto' },
                            ].map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="text-sm font-light hover:text-golden transition-colors duration-300"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-golden text-xs tracking-[0.3em] uppercase mb-6 font-light">
                            Contacto
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="https://wa.me/573043844516"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm font-light hover:text-golden transition-colors duration-300"
                                >
                                    <FaWhatsapp className="text-base" />
                                    +57 304 384 4516
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:contacto@equora.com"
                                    className="flex items-center gap-3 text-sm font-light hover:text-golden transition-colors duration-300"
                                >
                                    <FiMail className="text-base" />
                                    contacto@equora.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-3 text-sm font-light hover:text-golden transition-colors duration-300"
                                >
                                    <FaInstagram className="text-base" />
                                    @equora_oficial
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="border-t border-golden/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-light tracking-wider text-golden/40">
                        © {currentYear} Equora. Todos los derechos reservados.
                    </p>
                    <p className="text-xs font-light tracking-wider text-golden/30">
                        Artesanía · Nobleza · Distinción
                    </p>
                </div>
            </div>
        </footer>
    );
}
