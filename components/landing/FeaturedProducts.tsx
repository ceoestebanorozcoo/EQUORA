'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { formatPrice } from '@/utils/formatPrice';

function FeaturedProductCard({ product, index }: { product: IProduct; index: number }) {
  const category = product.category as ICategory;

  return (
    <ScrollReveal direction="up" delay={index * 80} className="h-full">
      <article className="group relative flex flex-col h-full bg-[#EDE5D8] border border-equora-dark/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-equora-amber/10 hover:border-equora-amber/30 transition-all duration-500 hover:-translate-y-2 transform-gpu">
        {/* Overlay clickable */}
        <Link href={`/producto/${product._id}`} className="absolute inset-0 z-10" aria-label={`Ver ${product.name}`} />
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

          {category?.name && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-equora-navy text-white font-body text-[11px] font-semibold tracking-widest uppercase">
              {category.name}
            </span>
          )}
          {product.stockStatus === 'soldout' && (
            <div className="absolute inset-0 bg-equora-dark/50 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-5 py-2 rounded-full bg-equora-amber/90 text-white font-body text-xs font-bold tracking-widest uppercase">
                Agotado
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-4 md:p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-[10px] text-equora-amber tracking-widest uppercase">
              {product.productCode}
            </span>
            {product.stockStatus === 'available' ? (
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
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-editorial text-equora-amber text-xl italic">
                {formatPrice(product.price)}
              </span>
            </div>
            <Link
              href={`/producto/${product._id}`}
              className="relative z-20 block w-full text-center py-2.5 bg-equora-dark hover:bg-[#4a2e1f] text-[#E7D6C2] rounded-full text-sm font-body font-medium tracking-widest uppercase transition-colors duration-300"
            >
              Ver producto
            </Link>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function FeaturedProducts({ products: initialProducts = [] }: { products: IProduct[] }) {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);

  useEffect(() => {
    if (initialProducts.length > 0) return;
    api.get('/products?featured=true')
      .then((res) => { setProducts(res.data.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [initialProducts.length]);

  return (
    <section id="destacados" className="bg-equora-dark py-24 px-6" aria-label="Productos destacados">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="font-editorial text-equora-amber italic text-lg mb-3">
              Productos destacados
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-wider">
              CONOCE NUESTROS PRODUCTOS
            </h2>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-equora-navy rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-white/10 rounded-full w-3/4" />
                  <div className="h-4 bg-equora-amber/20 rounded-full w-1/3" />
                  <div className="h-10 bg-white/5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-editorial italic text-2xl text-white/40">Próximamente nuevos productos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <FeaturedProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        )}

        <ScrollReveal direction="up" delay={400}>
          <div className="text-center mt-14">
            <Link
              href="/productos"
              className="inline-flex items-center gap-3 px-10 py-4 bg-equora-amber hover:bg-[#4a2e1f] text-white rounded-full font-body font-medium text-sm tracking-widest uppercase transition-colors duration-300"
            >
              Ver más productos
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
