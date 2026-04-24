'use client';

import { useEffect, useState, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { getProducts } from '@/lib/api';
import type { IProduct } from '@/types';

const PRODUCT_CATEGORIES: string[] = [];

export default function ProductGrid() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [visible, setVisible] = useState(false);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const params: { search?: string; category?: string } = {};
            if (search.trim()) params.search = search.trim();
            if (category) params.category = category;

            const res = await getProducts(params);
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [search, category]);

    useEffect(() => {
        const timer = setTimeout(fetchProducts, 300); // debounce search
        return () => clearTimeout(timer);
    }, [fetchProducts]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        const section = document.getElementById('coleccion');
        if (section) observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="coleccion" className="py-24 md:py-32 bg-cream">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* ── Section Header ── */}
                <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-olive/60 text-xs tracking-[0.5em] uppercase mb-4 font-light">
                        Nuestra selección
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cocoa mb-4">
                        Colección <span className="text-caramel italic">Equora</span>
                    </h2>
                    <div className="mx-auto w-12 h-px bg-golden/60 mt-4" />
                </div>

                {/* ── Filters ── */}
                <div className={`flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    {/* Search */}
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-olive/40 text-sm" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
                w-full pl-10 pr-4 py-3
                bg-white border border-golden/20
                rounded-sm text-sm text-cocoa
                placeholder:text-olive/40 placeholder:font-light placeholder:tracking-wider
                focus:outline-none focus:border-golden/50 focus:ring-1 focus:ring-golden/20
                transition-all duration-300
              "
                        />
                    </div>

                    {/* Category filter */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="
              px-4 py-3
              bg-white border border-golden/20
              rounded-sm text-sm text-cocoa
              focus:outline-none focus:border-golden/50 focus:ring-1 focus:ring-golden/20
              transition-all duration-300
              appearance-none
              bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2212%22%20height%3d%2212%22%20viewBox%3d%220%200%2012%2012%22%3e%3cpath%20fill%3d%22%239D9167%22%20d%3d%22M2%204l4%204%204-4%22%2f%3e%3c%2fsvg%3e')]
              bg-size-[12px] bg-position-[right_12px_center] bg-no-repeat
              pr-10
              min-w-45
            "
                    >
                        <option value="">Todas las categorías</option>
                        {PRODUCT_CATEGORIES.map((cat: string) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* ── Product Grid ── */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-square bg-golden/10 rounded-lg mb-4" />
                                <div className="h-3 bg-golden/10 rounded w-1/3 mb-2" />
                                <div className="h-5 bg-golden/10 rounded w-2/3 mb-2" />
                                <div className="h-5 bg-golden/10 rounded w-1/4 mb-4" />
                                <div className="h-10 bg-golden/10 rounded" />
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-olive/50 font-light tracking-wider">
                            No se encontraron productos
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <div
                                key={product._id}
                                className={`transition-all duration-700 ${visible
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
