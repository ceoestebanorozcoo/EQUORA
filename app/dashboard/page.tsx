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
    <div className="min-h-screen bg-[#E7D6C2]">
      {/* Top bar */}
      <header className="bg-equora-navy border-b border-white/10 sticky top-0 z-40">
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 flex items-center justify-between">
          {/* Logo + brand */}
          <div className="flex items-center gap-3 sm:gap-6">
            <a href="/" className="flex items-center gap-2.5 group transition-transform duration-300 hover:scale-105">
              <div className="relative h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-equora-amber/10 border border-equora-amber/25 overflow-hidden transition-colors duration-300 group-hover:border-equora-amber/50 shrink-0">
                <img src="/logo.svg" alt="EQUORA" className="w-full h-full object-contain p-1.5" />
              </div>
              <span className="font-display text-xl sm:text-2xl tracking-[4px] sm:tracking-[5px] text-white group-hover:text-equora-amber transition-colors duration-300">
                EQUORA
              </span>
            </a>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <span className="hidden sm:block font-body text-xs md:text-sm text-white/70 md:text-white/80 tracking-widest uppercase">
              Panel de administradora Estefanía
            </span>
          </div>

          {/* Right side */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#E7D6C2]/60 hover:text-equora-amber transition-colors cursor-pointer font-body text-sm"
            aria-label="Cerrar sesión"
          >
            <IoLogOut size={20} aria-hidden="true" />
            <span className="text-xs sm:text-sm">Salir</span>
          </button>
        </div>

        {/* Mobile subtitle — visible only on very small screens */}
        <div className="sm:hidden px-4 pb-2.5">
          <p className="font-body text-[10px] text-white/45 tracking-widest uppercase">
            Panel de administradora Estefanía
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8">
        {/* Tabs */}
        <div className="grid grid-cols-5 sm:flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 mb-6 md:mb-8 w-full sm:w-auto md:w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 md:gap-2 px-1 sm:px-3 md:px-4 py-2 sm:py-2 md:py-2.5 rounded-xl font-body font-medium transition-all cursor-pointer ${
                tab === t.key
                  ? 'bg-equora-navy text-white shadow-sm'
                  : 'text-[#6B7280] hover:text-equora-navy'
              }`}
              aria-pressed={tab === t.key}
            >
              {t.icon}
              <span className="text-[8px] sm:text-xs md:text-sm leading-tight text-center">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {tab === 'products' && (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
              <div>
                <p className="font-body text-[10px] text-equora-amber tracking-widest uppercase mb-0.5">Gestión</p>
                <h2 className="font-display text-xl sm:text-2xl tracking-wider text-equora-dark">PRODUCTOS</h2>
                {!loading && (
                  <p className="font-body text-xs text-gray-400 mt-0.5">
                    {products.length} producto{products.length !== 1 ? 's' : ''} registrado{products.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <Button onClick={() => { setEditProduct(null); setFormOpen(true); }} size="sm" className="shrink-0">
                <IoAdd size={15} className="mr-1" aria-hidden="true" />
                <span className="hidden sm:inline">Nuevo producto</span>
                <span className="sm:hidden">Nuevo</span>
              </Button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre o código..."
                className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-gray-200 bg-white font-body text-sm text-equora-dark placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber/50 transition"
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
          <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-gray-100">
              <div>
                <p className="font-body text-[10px] text-equora-amber tracking-widest uppercase mb-0.5">Configuración</p>
                <h2 className="font-display text-xl sm:text-2xl tracking-wider text-equora-dark">MI CUENTA</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                <ChangeEmailForm />
              </div>
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                <ChangePasswordForm />
              </div>
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
