'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import api from '@/lib/axios';
import { ICategory } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ImageUpload from './ImageUpload';
import { Skeleton } from '@/components/ui/Skeleton';
import { IoCreateOutline, IoTrash, IoAdd, IoPricetag } from 'react-icons/io5';

export default function CategoryManager() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<ICategory | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const fetchCategories = () => {
    setLoading(true);
    api.get('/categories').then((res) => {
      setCategories(res.data.data || []);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    setDeleteError('');
    try {
      await api.delete(`/categories/${deleteId}`);
      fetchCategories();
      setDeleteId(null);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Error eliminando categoría';
      setDeleteError(msg);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
        <div>
          <p className="font-body text-[10px] text-equora-amber tracking-widest uppercase mb-0.5">Gestión</p>
          <h2 className="font-display text-xl sm:text-2xl tracking-wider text-equora-dark">CATEGORÍAS</h2>
          {!loading && (
            <p className="font-body text-xs text-gray-400 mt-0.5">
              {categories.length} categoría{categories.length !== 1 ? 's' : ''} registrada{categories.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <Button onClick={() => setCreateOpen(true)} size="sm" className="shrink-0">
          <IoAdd size={15} className="mr-1" aria-hidden="true" />
          <span className="hidden sm:inline">Nueva categoría</span>
          <span className="sm:hidden">Nueva</span>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <IoPricetag size={20} className="text-gray-300" />
          </div>
          <p className="font-body text-sm text-gray-400">No hay categorías aún</p>
          <p className="font-body text-xs text-gray-300 mt-1">Crea la primera con el botón de arriba</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat, i) => (
            <div
              key={cat._id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-equora-amber/25 hover:shadow-md transition-all duration-250"
            >
              {/* Image strip */}
              <div className="relative h-28 bg-equora-ivory overflow-hidden">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-4xl text-equora-amber/15 tracking-widest">
                      {cat.name.charAt(0)}
                    </span>
                  </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                {/* Index badge */}
                <span className="absolute top-2.5 left-3 font-body text-[10px] text-white/60 font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Actions — appear on hover */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => setEditItem(cat)}
                    className="flex items-center justify-center w-7 h-7 bg-white/90 hover:bg-white text-gray-500 hover:text-equora-amber rounded-lg transition-colors cursor-pointer shadow-sm"
                    aria-label={`Editar ${cat.name}`}
                  >
                    <IoCreateOutline size={14} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => { setDeleteId(cat._id); setDeleteError(''); }}
                    className="flex items-center justify-center w-7 h-7 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-lg transition-colors cursor-pointer shadow-sm"
                    aria-label={`Eliminar ${cat.name}`}
                  >
                    <IoTrash size={13} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="px-4 py-3">
                <p className="font-display text-sm tracking-widest text-equora-dark truncate">{cat.name.toUpperCase()}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="font-body text-[11px] text-gray-400 font-mono">/{cat.slug}</p>
                  {(cat.productCount ?? 0) > 0 && (
                    <span className="font-body text-[10px] text-equora-amber/80 bg-equora-amber/8 px-2 py-0.5 rounded-full">
                      {cat.productCount} prod.
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Nueva categoría">
        <CategoryForm onSuccess={() => { setCreateOpen(false); fetchCategories(); }} onCancel={() => setCreateOpen(false)} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Editar categoría">
        {editItem && (
          <CategoryForm
            category={editItem}
            onSuccess={() => { setEditItem(null); fetchCategories(); }}
            onCancel={() => setEditItem(null)}
          />
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmar eliminación" size="sm">
        {deleteError && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-body" role="alert">
            {deleteError}
          </div>
        )}
        <p className="font-body text-[#6B7280] mb-6">¿Seguro deseas eliminar esta categoría?</p>
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
    </div>
  );
}

function CategoryForm({ category, onSuccess, onCancel }: { category?: ICategory; onSuccess: () => void; onCancel: () => void }) {
  const [name, setName] = useState(category?.name || '');
  const [image, setImage] = useState(category?.image || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('El nombre es requerido'); return; }
    setLoading(true);
    setError('');
    try {
      if (category) {
        await api.put(`/categories/${category._id}`, { name, image });
      } else {
        await api.post('/categories', { name, image });
      }
      onSuccess();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Error guardando categoría';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-body" role="alert">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="cat-name" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">Nombre *</label>
        <input
          id="cat-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber"
          placeholder="Ej: Riendas"
          required
        />
      </div>
      <ImageUpload value={image} onChange={setImage} folder="equora/categories" label="Imagen de la categoría (opcional)" />
      <div className="flex gap-3">
        <Button type="submit" loading={loading} className="flex-1">
          {category ? 'Guardar cambios' : 'Crear categoría'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
      </div>
    </form>
  );
}
