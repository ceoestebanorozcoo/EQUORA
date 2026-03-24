'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import ProductCard from '@/components/landing/ProductCard';
import { Search, ArrowLeft, ChevronDown, Check, X } from 'lucide-react';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('categoria') || '');
  const [loading, setLoading] = useState(true);
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/categories')]).then(([pRes, cRes]) => {
      setProducts(pRes.data.data || []);
      setCategories(cRes.data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.productCode.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || (p.category as ICategory)?._id === selectedCategory;
    return matchSearch && matchCat;
  });

  const activeCat = categories.find((c) => c._id === selectedCategory);
  const clearFilters = () => { setSearch(''); setSelectedCategory(''); };
  const hasFilters = search || selectedCategory;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero header */}
      <div className="relative overflow-hidden bg-equora-dark">
        <div className="absolute inset-0 bg-linear-to-b from-equora-dark/80 to-equora-navy/90" />
        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-20 md:pt-44 md:pb-28">
          <button
            onClick={() => router.push('/')}
            className="group inline-flex items-center gap-2.5 font-body text-sm text-[#F9F7F4]/80 hover:text-equora-amber transition-all duration-300 mb-10 cursor-pointer"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#F9F7F4]/50 group-hover:border-equora-amber/60 group-hover:bg-equora-amber/10 transition-all duration-300">
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            </span>
            <span className="tracking-wide uppercase text-xs font-medium">Volver al inicio</span>
          </button>

          <p className="font-editorial text-equora-amber italic text-lg md:text-xl mb-3">
            Catálogo completo
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#F9F7F4] tracking-wider">
            NUESTROS PRODUCTOS
          </h1>
          <p className="font-body text-equora-dark/50 text-base md:text-lg mt-4 max-w-xl">
            Cada pieza diseñada con precisión artesanal para quienes montan con criterio.
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="bg-white border-b border-equora-dark/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">

            {/* Search */}
            <div className="relative flex-1 min-w-35 sm:max-w-xs">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-equora-dark/50" aria-hidden="true" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full border border-equora-dark/15 bg-white font-body text-sm text-equora-dark placeholder-equora-dark/30 focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber/50 transition-all"
                aria-label="Buscar producto"
              />
            </div>

            {/* Categories dropdown */}
            <div className="relative" ref={catRef}>
              <button
                onClick={() => setCatOpen(!catOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-body text-sm font-medium border transition-all duration-300 cursor-pointer ${
                  selectedCategory
                    ? 'bg-equora-amber text-white border-equora-amber'
                    : 'bg-white text-equora-dark border-equora-dark/15 hover:border-equora-amber/40'
                }`}
                aria-expanded={catOpen}
              >
                <span>{activeCat ? activeCat.name : 'Categorías'}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${catOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown panel */}
              {catOpen && (
                <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-equora-dark/10 overflow-hidden z-50">
                  <div className="p-4 border-b border-equora-dark/8">
                    <p className="font-display text-xs tracking-widest text-equora-dark/40 uppercase">
                      Filtrar por categoría
                    </p>
                  </div>
                  <div className="p-3 grid grid-cols-2 gap-1.5 max-h-72 overflow-y-auto">
                    {/* All option */}
                    <button
                      onClick={() => { setSelectedCategory(''); setCatOpen(false); }}
                      className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl font-body text-sm text-left transition-all duration-200 cursor-pointer col-span-2 ${
                        selectedCategory === ''
                          ? 'bg-equora-amber/10 text-equora-amber font-medium'
                          : 'text-equora-dark hover:bg-equora-ivory'
                      }`}
                    >
                      <span>Todos los productos</span>
                      {selectedCategory === '' && <Check size={14} className="shrink-0" />}
                    </button>

                    {/* Category options */}
                    {categories.map((c) => (
                      <button
                        key={c._id}
                        onClick={() => { setSelectedCategory(c._id); setCatOpen(false); }}
                        className={`flex items-center justify-between gap-1 px-3 py-2.5 rounded-xl font-body text-sm text-left transition-all duration-200 cursor-pointer ${
                          selectedCategory === c._id
                            ? 'bg-equora-amber/10 text-equora-amber font-medium'
                            : 'text-equora-dark hover:bg-equora-ivory'
                        }`}
                      >
                        <span className="leading-tight">{c.name}</span>
                        {selectedCategory === c._id && <Check size={13} className="shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Clear filters */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-full font-body text-xs text-equora-dark/50 hover:text-equora-dark border border-equora-dark/15 bg-white transition-colors cursor-pointer"
                aria-label="Limpiar filtros"
              >
                <X size={13} aria-hidden="true" />
                Limpiar
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-editorial italic text-2xl text-equora-dark/50 mb-4">
              No se encontraron productos
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="font-body text-sm text-equora-amber hover:underline cursor-pointer"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
