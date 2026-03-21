'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { IProduct } from '@/types';
import ProductTable from '@/components/dashboard/ProductTable';
import ProductForm from '@/components/dashboard/ProductForm';
import CategoryManager from '@/components/dashboard/CategoryManager';
import ChangeEmailForm from '@/components/dashboard/ChangeEmailForm';
import ChangePasswordForm from '@/components/dashboard/ChangePasswordForm';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { IoAdd, IoLogOut, IoGrid, IoPricetag, IoSettings } from 'react-icons/io5';

type Tab = 'products' | 'categories' | 'account';

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('products');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    api.get('/auth/me').then((res) => setUserEmail(res.data.user?.email || '')).catch(() => {});
  }, []);

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
    { key: 'products', label: 'Productos', icon: <IoGrid size={18} aria-hidden="true" /> },
    { key: 'categories', label: 'Categorías', icon: <IoPricetag size={18} aria-hidden="true" /> },
    { key: 'account', label: 'Mi cuenta', icon: <IoSettings size={18} aria-hidden="true" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      {/* Top bar */}
      <header className="bg-equora-dark px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <h1 className="font-display text-xl tracking-[4px] text-equora-amber">EQUORA</h1>
        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="hidden sm:block font-body text-xs text-[#F9F7F4]/40">{userEmail}</span>
          )}
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
                  ? 'bg-equora-dark text-white shadow-sm'
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
            <ProductTable
              products={products}
              loading={loading}
              onEdit={handleEdit}
              onRefresh={fetchProducts}
            />
          </div>
        )}

        {/* Categories Tab */}
        {tab === 'categories' && <CategoryManager />}

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
