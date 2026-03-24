'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { IProduct } from '@/types';
import ProductTable from '@/components/dashboard/ProductTable';
import ProductForm from '@/components/dashboard/ProductForm';
import CategoryManager from '@/components/dashboard/CategoryManager';
import FeaturedManager from '@/components/dashboard/FeaturedManager';
import TestimonialManager from '@/components/dashboard/TestimonialManager';
import ChangeEmailForm from '@/components/dashboard/ChangeEmailForm';
import ChangePasswordForm from '@/components/dashboard/ChangePasswordForm';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { IoAdd, IoLogOut, IoGrid, IoPricetag, IoSettings, IoStar, IoChatbubbleEllipses } from 'react-icons/io5';

type Tab = 'products' | 'featured' | 'categories' | 'testimonials' | 'account';

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('products');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);
  const [search, setSearch] = useState('');

  const fetchProducts = useCallback(() => {
    setLoading(true);
    api.get('/products').then((res) => {
      setProducts(res.data.data || []);
    }).finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleLogout = async () => {
    await api.post('/auth/logout');
    router.push('/dashboard/login');
  };

  const handleEdit = (product: IProduct) => {
    setEditProduct(product);
    setFormOpen(true);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditProduct(null);
    fetchProducts();
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'products',      label: 'Productos',    icon: <IoGrid size={18} aria-hidden="true" /> },
    { key: 'categories',   label: 'Categorías',   icon: <IoPricetag size={18} aria-hidden="true" /> },
    { key: 'featured',     label: 'Destacados',   icon: <IoStar size={18} aria-hidden="true" /> },
    { key: 'testimonials', label: 'Testimonios',  icon: <IoChatbubbleEllipses size={18} aria-hidden="true" /> },
    { key: 'account',      label: 'Mi cuenta',    icon: <IoSettings size={18} aria-hidden="true" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      {/* Top bar */}
      <header className="bg-equora-navy border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        {/* Logo + brand */}
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-105">
            <div className="relative h-9 w-9 rounded-full bg-equora-amber/10 border border-equora-amber/25 overflow-hidden transition-colors duration-300 group-hover:border-equora-amber/50 shrink-0">
              <img src="/logo.svg" alt="EQUORA" className="w-full h-full object-contain p-1.5" />
            </div>
            <span className="font-display text-lg tracking-[5px] text-white group-hover:text-equora-amber transition-colors duration-300">
              EQUORA
            </span>
          </a>
          <div className="hidden sm:block w-px h-5 bg-white/10" />
          <span className="hidden sm:block font-body text-xs text-[#F9F7F4]/40 tracking-widest uppercase">
            Panel de administrador
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#F9F7F4]/60 hover:text-equora-amber transition-colors cursor-pointer font-body text-sm"
            aria-label="Cerrar sesión"
          >
            <IoLogOut size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm border border-gray-100 mb-8 w-full sm:w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all cursor-pointer ${
                tab === t.key
                  ? 'bg-equora-navy text-white shadow-sm'
                  : 'text-[#6B7280] hover:text-equora-dark'
              }`}
              aria-pressed={tab === t.key}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl tracking-wider text-equora-dark">PRODUCTOS</h2>
                <p className="font-body text-sm text-[#6B7280] mt-1">{products.length} producto{products.length !== 1 ? 's' : ''} registrado{products.length !== 1 ? 's' : ''}</p>
              </div>
              <Button onClick={() => { setEditProduct(null); setFormOpen(true); }} size="sm">
                <IoAdd size={16} className="mr-1" aria-hidden="true" />
                Nuevo producto
              </Button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre o código..."
                className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-gray-200 bg-white font-body text-sm text-equora-dark placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber/50 transition"
              />
            </div>
            <ProductTable
              products={products.filter((p) =>
                !search.trim() ||
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.productCode.toLowerCase().includes(search.toLowerCase())
              )}
              loading={loading}
              onEdit={handleEdit}
              onRefresh={fetchProducts}
            />
          </div>
        )}

        {/* Featured Tab */}
        {tab === 'featured' && <FeaturedManager />}

        {/* Categories Tab */}
        {tab === 'categories' && <CategoryManager />}

        {/* Testimonials Tab */}
        {tab === 'testimonials' && <TestimonialManager />}

        {/* Account Tab */}
        {tab === 'account' && (
          <div className="max-w-lg space-y-8">
            <h2 className="font-display text-2xl tracking-wider text-equora-dark">MI CUENTA</h2>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <ChangeEmailForm />
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <ChangePasswordForm />
            </div>
          </div>
        )}
      </div>

      {/* Product form modal */}
      <Modal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditProduct(null); }}
        title={editProduct ? 'Editar producto' : 'Nuevo producto'}
        size="lg"
      >
        <ProductForm
          product={editProduct}
          onSuccess={handleFormSuccess}
          onCancel={() => { setFormOpen(false); setEditProduct(null); }}
        />
      </Modal>
    </div>
  );
}
