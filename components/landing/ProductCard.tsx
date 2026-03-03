'use client';

import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import type { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const isSoldOut = product.stockStatus === 'soldout';
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573043844516';

    const whatsappMessage = encodeURIComponent(
        `Hola, quiero comprar ${product.name} (Código: ${product.productCode}). ¿Está disponible?`
    );

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    const formattedPrice = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(product.price);

    return (
        <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:shadow-cocoa/10 transition-all duration-700 border border-golden/10 hover:border-golden/30">
            {/* ── Image ── */}
            <div className="relative aspect-square overflow-hidden bg-cream">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Sold out overlay */}
                {isSoldOut && (
                    <div className="absolute inset-0 bg-cocoa/50 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-wine/90 text-cream text-xs tracking-[0.3em] uppercase px-5 py-2 rounded-sm font-light">
                            Agotado
                        </span>
                    </div>
                )}

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-cocoa/80 backdrop-blur-sm text-golden text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm font-light">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* ── Info ── */}
            <div className="p-5">
                {/* Product code */}
                <p className="text-olive/60 text-[10px] tracking-[0.3em] uppercase mb-2 font-light">
                    Código: <span className="font-medium text-olive">{product.productCode}</span>
                </p>

                {/* Name */}
                <h3 className="font-display text-lg text-cocoa mb-1 leading-snug group-hover:text-caramel transition-colors duration-300">
                    {product.name}
                </h3>

                {/* Price */}
                <p className="text-caramel font-display text-xl mb-4">
                    {formattedPrice}
                </p>

                {/* WhatsApp Button */}
                {isSoldOut ? (
                    <button
                        disabled
                        className="
              w-full flex items-center justify-center gap-2
              px-4 py-3
              bg-cream-dark text-cocoa/30
              text-xs tracking-[0.2em] uppercase font-light
              rounded-sm cursor-not-allowed
              border border-cocoa/10
            "
                    >
                        No disponible
                    </button>
                ) : (
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              w-full flex items-center justify-center gap-2
              px-4 py-3
              bg-cocoa text-golden
              text-xs tracking-[0.2em] uppercase font-light
              rounded-sm
              border border-cocoa
              hover:bg-caramel hover:border-caramel
              hover:shadow-lg hover:shadow-caramel/20
              transition-all duration-500
              group/btn
            "
                    >
                        <FaWhatsapp className="text-base transition-transform duration-300 group-hover/btn:scale-110" />
                        Comprar por WhatsApp
                    </a>
                )}
            </div>
        </div>
    );
}
