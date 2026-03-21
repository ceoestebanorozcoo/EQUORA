'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IProduct, ICategory } from '@/types';
import { formatPrice } from '@/utils/formatPrice';
import Badge from '@/components/ui/Badge';
import { IoLogoWhatsapp } from 'react-icons/io5';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573043844516';

function buildWhatsAppLink(product: IProduct): string {
  const msg = encodeURIComponent(
    `Hola, quiero comprar ${product.name} (${product.productCode})`
  );
  return `https://wa.me/${WHATSAPP}?text=${msg}`;
}

export default function ProductCard({ product, delay = 0 }: { product: IProduct; delay?: number }) {
  const category = product.category as ICategory;
  const isAvailable = product.stockStatus === 'available';

  return (
    <article
      className="reveal product-card bg-white rounded-2xl overflow-hidden shadow-sm"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden h-64">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-equora-ivory flex items-center justify-center">
            <span className="font-display text-3xl text-equora-amber/30">EQUORA</span>
          </div>
        )}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge variant="gray">Agotado</Badge>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          {category && <Badge variant="amber">{category.name}</Badge>}
          <span className="font-body text-xs text-[#6B7280] ml-auto">{product.productCode}</span>
        </div>

        <h3 className="font-display text-xl tracking-wide text-equora-dark mb-1 leading-tight">
          {product.name}
        </h3>

        {product.description && (
          <p className="font-body text-sm text-[#6B7280] mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="font-editorial text-xl font-semibold text-equora-dark">
            {formatPrice(product.price)}
          </span>
          <Badge variant={isAvailable ? 'green' : 'gray'}>
            {isAvailable ? 'Disponible' : 'Agotado'}
          </Badge>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            href={`/producto/${product._id}`}
            className="flex-1 text-center py-2.5 border border-equora-amber text-equora-amber rounded-full text-sm font-body font-medium hover:bg-equora-amber hover:text-white transition-colors cursor-pointer"
          >
            Ver producto
          </Link>
          <a
            href={isAvailable ? buildWhatsAppLink(product) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Comprar ${product.name} por WhatsApp`}
            aria-disabled={!isAvailable}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-body font-medium transition-colors ${
              isAvailable
                ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
            }`}
          >
            <IoLogoWhatsapp size={16} aria-hidden="true" />
            Comprar
          </a>
        </div>
      </div>
    </article>
  );
}
