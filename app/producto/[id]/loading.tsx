import { Skeleton } from '@/components/ui/Skeleton';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function ProductLoading() {
  return (
    <>
      <Navbar />

      {/* Dark hero skeleton */}
      <div className="relative overflow-hidden bg-equora-dark">
        <div className="absolute inset-0 bg-linear-to-b from-equora-dark/80 to-equora-navy/90" />
        <div className="relative max-w-5xl mx-auto px-6 pt-36 pb-20 md:pt-44 md:pb-24 space-y-4">
          <Skeleton className="h-5 w-20 bg-white/10" />
          <Skeleton className="h-5 w-36 bg-white/10" />
          <Skeleton className="h-14 w-72 bg-white/10" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="bg-white">
        <main className="max-w-6xl mx-auto px-6 py-16 md:py-20">

          {/* Product grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-14">

            {/* Galería izquierda */}
            <div className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <div className="flex gap-2 overflow-x-auto pb-1">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-16 h-16 shrink-0 rounded-xl" />
                ))}
              </div>
            </div>

            {/* Info derecha */}
            <div className="space-y-8">

              {/* Código + badge */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-px" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>

              {/* Categoría + nombre */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-3/4" />
              </div>

              {/* Precio + divider */}
              <div className="pb-6 border-b border-equora-navy/40 space-y-3">
                <Skeleton className="h-12 w-40" />
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Skeleton className="flex-1 h-14 rounded-full" />
                <Skeleton className="flex-1 h-14 rounded-full" />
              </div>
            </div>
          </div>

          {/* Info notes skeleton — 2×2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
