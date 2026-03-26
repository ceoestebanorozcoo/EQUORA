'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import { formatPrice } from '@/utils/formatPrice';
import Badge from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { IoLogoWhatsapp, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { ArrowLeft, Clock, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573043844516';

function ImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);

  if (!images.length) {
    return (
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-equora-navy flex items-center justify-center">
        <span className="font-display text-6xl text-equora-amber/20">EQUORA</span>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm group">
        <Image
          src={images[current]}
          alt={`${name} — imagen ${current + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={current === 0}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white"
              aria-label="Imagen anterior"
            >
              <IoChevronBack size={18} className="text-equora-dark" aria-hidden="true" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white"
              aria-label="Siguiente imagen"
            >
              <IoChevronForward size={18} className="text-equora-dark" aria-hidden="true" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === current ? 'bg-white w-5' : 'bg-white/50 w-2'
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                i === current ? 'border-equora-amber' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <Image src={url} alt={`Miniatura ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch(() => setError('Producto no encontrado'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="relative overflow-hidden bg-equora-dark">
          <div className="absolute inset-0 bg-linear-to-b from-equora-dark/80 to-equora-navy/90" />
          <div className="relative max-w-5xl mx-auto px-6 pt-36 pb-20 space-y-4">
            <Skeleton className="h-5 w-28 bg-white/10" />
            <Skeleton className="h-5 w-32 bg-white/10" />
            <Skeleton className="h-14 w-full max-w-sm bg-white/10" />
          </div>
        </div>
        <div className="min-h-screen bg-white">
          <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-3">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="w-16 h-16 rounded-xl" />)}
              </div>
            </div>
            <div className="space-y-4 pt-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-24 w-full" />
              <div className="flex gap-3 pt-4">
                <Skeleton className="h-12 flex-1 rounded-full" />
                <Skeleton className="h-12 w-32 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-equora-dark flex items-center justify-center px-6">
          <div className="text-center">
            <p className="font-editorial italic text-2xl text-[#E7D6C2]/50 mb-6">
              {error || 'Producto no encontrado'}
            </p>
            <Link href="/productos" className="font-body text-sm text-equora-amber hover:underline cursor-pointer">
              ← Ver todos los productos
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const category = product.category as ICategory;
  const isAvailable = product.stockStatus === 'available';
  const whatsappMsg = encodeURIComponent(`Hola, quiero comprar ${product.name} (${product.productCode})`);
  const whatsappLink = `https://wa.me/${WHATSAPP}?text=${whatsappMsg}`;
  const images = product.images || [];

  return (
    <>
      <Navbar />

      {/* Dark hero */}
      <div className="relative overflow-hidden bg-equora-dark">
        <div className="absolute inset-0 bg-linear-to-b from-equora-dark/80 to-equora-navy/90" />
        <div className="relative max-w-5xl mx-auto px-6 pt-36 pb-20 md:pt-44 md:pb-24">
          <button
            onClick={() => router.back()}
            className="group inline-flex items-center gap-2.5 font-body text-sm text-[#E7D6C2]/80 hover:text-equora-amber transition-all duration-300 mb-10 cursor-pointer"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#E7D6C2]/50 group-hover:border-equora-amber/60 group-hover:bg-equora-amber/10 transition-all duration-300">
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            </span>
            <span className="tracking-wide uppercase text-xs font-medium">Volver</span>
          </button>

          {category?.name && (
            <p className="font-editorial text-equora-amber italic text-lg md:text-xl mb-3">
              {category.name}
            </p>
          )}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#E7D6C2] tracking-wider leading-tight">
            DETALLE DEL PRODUCTO
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <main className="max-w-6xl mx-auto px-6 py-16 md:py-20">

          {/* Product grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-14">

            {/* Carousel */}
            <ImageCarousel images={images} name={product.name} />

            {/* Info panel */}
            <div className="space-y-8">

              {/* Code + badge */}
              <div className="flex items-center gap-3">
                <span className="font-body text-xs tracking-widest text-equora-dark/40 uppercase">
                  {product.productCode}
                </span>
                <span className="w-px h-4 bg-equora-dark/15" />
                <Badge variant={isAvailable ? 'green' : 'gray'}>
                  {isAvailable ? 'Disponible' : 'Agotado'}
                </Badge>
              </div>

              {/* Name */}
              <div>
                {category?.name && (
                  <p className="font-editorial text-equora-amber italic text-base mb-2">
                    {category.name}
                  </p>
                )}
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider text-equora-dark leading-tight">
                  {product.name}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 pb-6 border-b border-equora-navy/40">
                <span className="font-editorial text-3xl md:text-5xl text-equora-amber italic leading-none">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="font-editorial italic text-lg text-equora-dark/70 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {isAvailable ? (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-equora-amber text-white rounded-full font-body font-medium tracking-wide hover:bg-[#0d1e30] transition-colors duration-300 cursor-pointer"
                    aria-label={`Comprar ${product.name} por WhatsApp`}
                  >
                    <IoLogoWhatsapp size={21} aria-hidden="true" />
                    Comprar
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-gray-100 text-gray-400 rounded-full font-body font-medium cursor-not-allowed"
                  >
                    <IoLogoWhatsapp size={21} aria-hidden="true" />
                    Producto Agotado
                  </button>
                )}
                <Link
                  href="/productos"
                  className="flex-1 flex items-center justify-center py-4 rounded-full border-2 border-equora-amber/60 text-equora-amber font-body font-medium hover:border-equora-amber hover:bg-equora-amber hover:text-white transition-all duration-300"
                >
                  Ver más productos
                </Link>
              </div>
            </div>
          </div>

          {/* Info notes — 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Clock,       text: 'Fabricación: 8 a 15 días hábiles',          label: 'Producción' },
              { icon: Truck,       text: 'Envío a todo Colombia vía Interrapidísimo', label: 'Envíos' },
              { icon: CreditCard,  text: 'Pago por transferencia bancaria',           label: 'Pago' },
              { icon: ShieldCheck, text: 'Garantía: 15 días calendario',              label: 'Garantía' },
            ].map(({ icon: Icon, text, label }) => (
              <div
                key={label}
                className="group flex items-center gap-5 px-6 py-5 bg-[#E7D6C2] rounded-2xl border border-equora-dark/8 transition-all duration-300 hover:border-equora-amber/40 hover:shadow-lg hover:shadow-equora-amber/10 hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-equora-amber/15 shrink-0 transition-all duration-300 group-hover:bg-equora-amber/25 group-hover:scale-110">
                  <Icon className="w-5 h-5 text-equora-amber" />
                </span>
                <div>
                  <p className="font-display text-[10px] tracking-widest text-equora-dark/40 uppercase mb-0.5">{label}</p>
                  <p className="font-body text-sm text-equora-dark/70 group-hover:text-equora-dark/90 transition-colors duration-300">{text}</p>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>

      <Footer />
    </>
  );
}
