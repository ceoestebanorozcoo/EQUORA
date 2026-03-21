'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import { formatPrice } from '@/utils/formatPrice';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { IoLogoWhatsapp, IoArrowBack, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573043844516';

function ImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);

  if (!images.length) {
    return (
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm flex items-center justify-center">
        <span className="font-display text-6xl text-equora-amber/20">EQUORA</span>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm group">
        <Image
          src={images[current]}
          alt={`${name} — imagen ${current + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={current === 0}
        />

        {/* Arrows — only if more than 1 image */}
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

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === current ? 'bg-white w-5' : 'bg-white/50'
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
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
        <div className="min-h-screen bg-equora-ivory pt-28 pb-24 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-3">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="w-16 h-16 rounded-xl" />)}
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-8 w-32" />
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
        <div className="min-h-screen bg-equora-ivory flex items-center justify-center px-6">
          <div className="text-center">
            <p className="font-editorial italic text-2xl text-[#6B7280] mb-6">
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
      <div className="min-h-screen bg-equora-ivory">
        <main className="max-w-5xl mx-auto px-6 pt-28 pb-24">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#6B7280] hover:text-equora-dark transition-colors font-body text-sm mb-10 cursor-pointer"
          >
            <IoArrowBack size={16} aria-hidden="true" />
            Volver
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Carousel */}
            <div className="animate-fade-in">
              <ImageCarousel images={images} name={product.name} />
            </div>

            {/* Info */}
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center gap-3">
                {category && <Badge variant="amber">{category.name}</Badge>}
                <span className="font-body text-sm text-[#6B7280]">{product.productCode}</span>
              </div>

              <h1 className="font-display text-5xl tracking-wider text-equora-dark leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <span className="font-editorial text-3xl font-semibold text-equora-dark">
                  {formatPrice(product.price)}
                </span>
                <Badge variant={isAvailable ? 'green' : 'gray'}>
                  {isAvailable ? 'Disponible' : 'Agotado'}
                </Badge>
              </div>

              {product.description && (
                <div className="border-t border-equora-dark/10 pt-6">
                  <p className="font-editorial italic text-lg text-[#0D0D0D] leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {isAvailable ? (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-green-500 text-white rounded-full font-body font-medium hover:bg-green-600 transition-colors cursor-pointer"
                    aria-label={`Comprar ${product.name} por WhatsApp`}
                  >
                    <IoLogoWhatsapp size={20} aria-hidden="true" />
                    Comprar por WhatsApp
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-100 text-gray-400 rounded-full font-body font-medium cursor-not-allowed"
                  >
                    <IoLogoWhatsapp size={20} aria-hidden="true" />
                    Producto Agotado
                  </button>
                )}
                <Link href="/productos">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Ver más productos
                  </Button>
                </Link>
              </div>

              <div className="bg-white/60 rounded-xl p-4 space-y-2">
                {[
                  'Fabricación: 3 a 4 días hábiles',
                  'Envío a todo Colombia vía Interrapidísimo',
                  'Pago por transferencia bancaria',
                  'Garantía: 15 días calendario',
                ].map((note) => (
                  <div key={note} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-equora-amber shrink-0" aria-hidden="true" />
                    <p className="font-body text-sm text-[#6B7280]">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
