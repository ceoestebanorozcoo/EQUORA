'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { ICategory } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ImageUpload from './ImageUpload';
import { Skeleton } from '@/components/ui/Skeleton';
import { IoCreate, IoTrash, IoAdd } from 'react-icons/io5';

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl tracking-wider text-equora-dark">CATEGORÍAS</h2>
        <Button onClick={() => setCreateOpen(true)} size="sm">
          <IoAdd size={16} className="mr-1" aria-hidden="true" />
          Nueva categoría
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-editorial italic text-xl text-[#6B7280]">No hay categorías aún</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat._id} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between gap-3 shadow-sm">
              <div>
                <p className="font-body font-medium text-equora-dark">{cat.name}</p>
                <p className="font-body text-xs text-[#6B7280]">/{cat.slug}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => setEditItem(cat)}
                  className="p-2 text-[#6B7280] hover:text-equora-amber hover:bg-equora-ivory rounded-lg transition-colors cursor-pointer"
                  aria-label={`Editar ${cat.name}`}
                >
                  <IoCreate size={16} aria-hidden="true" />
                </button>
                <button
                  onClick={() => { setDeleteId(cat._id); setDeleteError(''); }}
                  className="p-2 text-[#6B7280] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  aria-label={`Eliminar ${cat.name}`}
                >
                  <IoTrash size={16} aria-hidden="true" />
                </button>
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
