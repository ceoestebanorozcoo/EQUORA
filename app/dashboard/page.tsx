'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiPlus, FiLogOut, FiPackage } from 'react-icons/fi';
import ProductTable from '@/components/dashboard/ProductTable';
import ProductForm from '@/components/dashboard/ProductForm';
import DeleteModal from '@/components/dashboard/DeleteModal';
import { getProducts, logout } from '@/lib/api';
import type { Product } from '@/types';

export default function DashboardPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getProducts();
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/dashboard/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleSaved = () => {
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
    };

    const handleDeleted = () => {
        setDeletingProduct(null);
        fetchProducts();
    };

    const availableCount = products.filter((p) => p.stockStatus === 'available').length;
    const soldOutCount = products.filter((p) => p.stockStatus === 'soldout').length;

    return (
        <div className="min-h-screen bg-cream">
            {/* ── Top Bar ── */}
            <header className="bg-white border-b border-golden/15 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9">
                            <Image
                                src="/logo.png"
                                alt="Equora"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div>
                            <h1 className="font-display text-lg text-cocoa tracking-wider">
                                EQUORA
                            </h1>
                            <p className="text-[10px] text-olive/50 tracking-[0.2em] uppercase font-light">
                                Dashboard
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs text-olive/60 hover:text-wine tracking-[0.15em] uppercase font-light transition-colors duration-300"
                    >
                        <FiLogOut className="text-sm" />
                        Cerrar sesión
                    </button>
                </div>
            </header>

            {/* ── Main Content ── */}
            <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg border border-golden/15 p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-golden/10 flex items-center justify-center">
                                <FiPackage className="text-caramel" />
                            </div>
                            <div>
                                <p className="text-2xl font-display text-cocoa">{products.length}</p>
                                <p className="text-[10px] text-olive/50 tracking-[0.2em] uppercase font-light">
                                    Total productos
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-golden/15 p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-olive" />
                            </div>
                            <div>
                                <p className="text-2xl font-display text-cocoa">{availableCount}</p>
                                <p className="text-[10px] text-olive/50 tracking-[0.2em] uppercase font-light">
                                    Disponibles
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-golden/15 p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-wine" />
                            </div>
                            <div>
                                <p className="text-2xl font-display text-cocoa">{soldOutCount}</p>
                                <p className="text-[10px] text-olive/50 tracking-[0.2em] uppercase font-light">
                                    Agotados
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-xl text-cocoa">
                        Productos
                    </h2>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-cocoa text-golden text-xs tracking-[0.2em] uppercase font-light rounded-sm hover:bg-caramel transition-all duration-300"
                    >
                        <FiPlus className="text-sm" />
                        Nuevo Producto
                    </button>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="bg-white rounded-lg border border-golden/15 p-12 text-center">
                        <div className="w-8 h-8 border-2 border-golden/30 border-t-golden rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-olive/50 text-xs tracking-[0.3em] uppercase font-light">
                            Cargando productos...
                        </p>
                    </div>
                ) : (
                    <ProductTable
                        products={products}
                        onEdit={handleEdit}
                        onDelete={setDeletingProduct}
                        onRefresh={fetchProducts}
                    />
                )}
            </main>

            {/* ── Modals ── */}
            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onClose={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                    }}
                    onSaved={handleSaved}
                />
            )}

            {deletingProduct && (
                <DeleteModal
                    product={deletingProduct}
                    onClose={() => setDeletingProduct(null)}
                    onDeleted={handleDeleted}
                />
            )}
        </div>
    );
}
