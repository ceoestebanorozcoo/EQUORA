'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import ProductCard from '@/components/landing/ProductCard';
import { IoSearch, IoClose, IoArrowBack } from 'react-icons/io5';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('categoria') || '');
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/categories')]).then(([pRes, cRes]) => {
      setProducts(pRes.data.data || []);
      setCategories(cRes.data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 60);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [loading]);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || (p.category as ICategory)?._id === selectedCategory;
    return matchSearch && matchCat;
  });

  const clearFilters = () => { setSearch(''); setSelectedCategory(''); };
  const hasFilters = search || selectedCategory;
  const activeCatName = selectedCategory
    ? categories.find((c) => c._id === selectedCategory)?.name
    : null;

  return (
    <section className="min-h-screen bg-equora-ivory pt-32 pb-24 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#6B7280] hover:text-equora-dark transition-colors font-body text-sm mb-10 cursor-pointer"
        >
          <IoArrowBack size={16} aria-hidden="true" />
          Volver
        </button>

        {/* Header */}
        <div className="mb-12">
          <p className="font-editorial italic text-equora-amber text-lg mb-2">
            {activeCatName ? `Categoría: ${activeCatName}` : 'Catálogo completo'}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-equora-dark tracking-wider">
            {activeCatName ? activeCatName.toUpperCase() : 'TODOS LOS PRODUCTOS'}
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1 max-w-xs">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={16} aria-hidden="true" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm font-body focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber"
              aria-label="Buscar producto por nombre"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-5 py-3 bg-white border border-gray-200 rounded-full text-sm font-body focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber cursor-pointer"
            aria-label="Filtrar por categoría"
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-full text-sm font-body text-[#6B7280] hover:text-equora-dark hover:border-gray-300 transition-colors cursor-pointer"
            >
              <IoClose size={14} aria-hidden="true" />
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Results count */}
        {!loading && (
          <p className="font-body text-sm text-[#6B7280] mb-8">
            {filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            {activeCatName ? ` en ${activeCatName}` : ''}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-editorial italic text-2xl text-[#6B7280] mb-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product._id} product={product} delay={i * 60} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
