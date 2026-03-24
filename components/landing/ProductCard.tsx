'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IProduct, ICategory } from '@/types';
import { formatPrice } from '@/utils/formatPrice';

export default function ProductCard({ product }: { product: IProduct }) {
  const category = product.category as ICategory;
  const isAvailable = product.stockStatus === 'available';

  return (
    <Link
      href={`/producto/${product._id}`}
      className="group block relative rounded-2xl border border-equora-dark/10 bg-[#EDE5D8] overflow-hidden transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-2xl hover:shadow-equora-amber/10 hover:border-equora-amber/30"
    >
      {/* Image */}
      <div className="relative aspect-3/4 overflow-hidden bg-equora-navy">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-equora-dark flex items-center justify-center">
            <span className="font-display text-3xl text-equora-amber/30">EQUORA</span>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-equora-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category tag */}
        {category?.name && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-equora-amber text-white font-body text-[11px] font-semibold tracking-widest uppercase">
            {category.name}
          </span>
        )}

        {/* Sold out overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-equora-dark/50 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-5 py-2 rounded-full bg-equora-amber/90 text-white font-body text-xs font-bold tracking-widest uppercase">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-[10px] text-equora-amber tracking-widest uppercase">
            {product.productCode}
          </span>
          {isAvailable ? (
            <span className="w-2 h-2 rounded-full bg-green-500 ring-2 ring-green-500/20" title="Disponible" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-gray-300 ring-2 ring-gray-200" title="Agotado" />
          )}
        </div>

        <h3 className="font-display text-xl text-equora-dark leading-tight mb-1 group-hover:text-equora-amber transition-colors duration-300">
          {product.name}
        </h3>

        {product.description && (
          <p className="font-body text-xs text-equora-dark/50 leading-relaxed mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="font-editorial text-equora-amber text-xl italic">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="w-full py-2.5 rounded-full bg-equora-amber hover:bg-[#8a5224] text-white font-body text-xs font-medium tracking-widest uppercase text-center transition-colors duration-300">
          Ver producto
        </div>
      </div>
    </Link>
  );
}
