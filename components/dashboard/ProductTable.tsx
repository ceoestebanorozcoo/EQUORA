'use client';

import { useState } from 'react';
import Image from 'next/image';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import { formatPrice } from '@/utils/formatPrice';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';

interface ProductTableProps {
  products: IProduct[];
  loading: boolean;
  onEdit: (product: IProduct) => void;
  onRefresh: () => void;
}

export default function ProductTable({ products, loading, onEdit, onRefresh }: ProductTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete(`/products/${deleteId}`);
      onRefresh();
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const toggleStock = async (product: IProduct) => {
    setTogglingId(product._id);
    try {
      await api.put(`/products/${product._id}`, {
        stockStatus: product.stockStatus === 'available' ? 'soldout' : 'available',
      });
      onRefresh();
    } finally {
      setTogglingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-16">
        <p className="font-editorial italic text-xl text-[#6B7280]">No hay productos aún</p>
      </div>
    );
  }

  return (
    <>
      {/* ── Card layout (< md = below 768px) ── */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
        {products.map((product) => {
          const category = product.category as ICategory;
          return (
            <div key={product._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-start gap-3">
                {/* Image */}
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-equora-ivory shrink-0">
                  {product.images?.[0] ? (
                    <Image src={product.images[0]} alt={product.name} width={56} height={56} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-xs text-equora-amber/40">E</span>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-equora-dark text-sm leading-snug">{product.name}</p>
                  {category && <p className="font-body text-xs text-[#6B7280]">{category.name}</p>}
                  <p className="font-body text-xs text-[#9CA3AF] font-mono mt-0.5">{product.productCode}</p>
                </div>
                {/* Toggle */}
                <button
                  onClick={() => toggleStock(product)}
                  disabled={togglingId === product._id}
                  className="shrink-0 disabled:opacity-50 cursor-pointer pt-0.5"
                  aria-label={`Cambiar estado de ${product.name}`}
                >
                  <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                    product.stockStatus === 'available' ? 'bg-equora-amber' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                      product.stockStatus === 'available' ? 'left-5' : 'left-0.5'
                    }`} />
                  </div>
                </button>
              </div>

              {/* Price + status + actions */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                <div>
                  <span className="font-editorial text-sm font-semibold text-equora-dark">
                    {formatPrice(product.price)}
                  </span>
                  <span className={`ml-2 font-body text-xs font-medium ${
                    product.stockStatus === 'available' ? 'text-equora-amber' : 'text-[#6B7280]'
                  }`}>
                    {product.stockStatus === 'available' ? 'Disponible' : 'Agotado'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEdit(product)}
                    className="flex items-center justify-center w-7 h-7 bg-white border border-gray-200 hover:bg-equora-amber/10 hover:border-equora-amber/30 text-gray-400 hover:text-equora-amber rounded-lg transition-colors cursor-pointer shadow-sm"
                    aria-label={`Editar ${product.name}`}
                  >
                    <IoCreateOutline size={14} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setDeleteId(product._id)}
                    className="flex items-center justify-center w-7 h-7 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer shadow-sm"
                    aria-label={`Eliminar ${product.name}`}
                  >
                    <IoTrashOutline size={13} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Table layout (≥ md = 768px+) ── */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full min-w-150" role="table">
          <thead className="bg-equora-navy text-[#F9F7F4]">
            <tr>
              <th className="text-left py-4 px-5 font-body text-xs font-medium tracking-wider uppercase" scope="col">Producto</th>
              <th className="text-left py-4 px-5 font-body text-xs font-medium tracking-wider uppercase" scope="col">Código</th>
              <th className="text-left py-4 px-5 font-body text-xs font-medium tracking-wider uppercase" scope="col">Precio</th>
              <th className="text-left py-4 px-5 font-body text-xs font-medium tracking-wider uppercase" scope="col">Estado</th>
              <th className="text-right py-4 px-5 font-body text-xs font-medium tracking-wider uppercase" scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {products.map((product) => {
              const category = product.category as ICategory;
              return (
                <tr key={product._id} className="hover:bg-[#F9F7F4] transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-equora-ivory shrink-0">
                        {product.images?.[0] ? (
                          <Image src={product.images[0]} alt={product.name} width={48} height={48} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="font-display text-xs text-equora-amber/40">E</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-body font-medium text-equora-dark text-sm">{product.name}</p>
                        {category && <p className="font-body text-xs text-[#6B7280]">{category.name}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="font-body text-sm text-[#6B7280] font-mono">{product.productCode}</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="font-editorial text-sm font-semibold text-equora-dark">
                      {formatPrice(product.price)}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <button
                      onClick={() => toggleStock(product)}
                      disabled={togglingId === product._id}
                      className="flex items-center gap-2 cursor-pointer disabled:opacity-50 group"
                      aria-label={`Cambiar estado de ${product.name}`}
                    >
                      <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        product.stockStatus === 'available' ? 'bg-equora-amber' : 'bg-gray-300'
                      }`}>
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                          product.stockStatus === 'available' ? 'left-5' : 'left-0.5'
                        }`} />
                      </div>
                      <span className={`font-body text-xs font-medium ${
                        product.stockStatus === 'available' ? 'text-equora-amber' : 'text-[#6B7280]'
                      }`}>
                        {product.stockStatus === 'available' ? 'Disponible' : 'Agotado'}
                      </span>
                    </button>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onEdit(product)}
                        className="flex items-center justify-center w-7 h-7 bg-white border border-gray-200 hover:bg-equora-amber/10 hover:border-equora-amber/30 text-gray-400 hover:text-equora-amber rounded-lg transition-colors cursor-pointer shadow-sm"
                        aria-label={`Editar ${product.name}`}
                      >
                        <IoCreateOutline size={14} aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => setDeleteId(product._id)}
                        className="flex items-center justify-center w-7 h-7 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer shadow-sm"
                        aria-label={`Eliminar ${product.name}`}
                      >
                        <IoTrashOutline size={13} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmar eliminación" size="sm">
        <p className="font-body text-[#6B7280] mb-6">¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.</p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200">
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            loading={deleting}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            Eliminar
          </Button>
        </div>
      </Modal>
    </>
  );
}
