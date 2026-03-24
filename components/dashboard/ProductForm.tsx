'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import Button from '@/components/ui/Button';
import MultiImageUpload from './MultiImageUpload';
import { formatPrice } from '@/utils/formatPrice';

interface ProductFormProps {
  product?: IProduct | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: product?.name || '',
    category: (product?.category as ICategory)?._id || '',
    price: product?.price?.toString() || '',
    images: product?.images || [],
    description: product?.description || '',
    stockStatus: product?.stockStatus || 'available',
  });

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.data || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.category || !form.price) {
      setError('Nombre, categoría y precio son requeridos');
      return;
    }

    setLoading(true);
    try {
      if (product) {
        await api.put(`/products/${product._id}`, { ...form, price: Number(form.price) });
      } else {
        await api.post('/products', { ...form, price: Number(form.price) });
      }
      onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error guardando producto';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-body" role="alert">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
          Nombre del producto *
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber"
          placeholder="Ej: Perchero para montura"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
          Categoría *
        </label>
        <select
          id="category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber cursor-pointer"
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
          Precio (COP) *
        </label>
        <input
          id="price"
          type="number"
          min="0"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber"
          placeholder="Ej: 85000"
          required
        />
        {form.price && !isNaN(Number(form.price)) && (
          <p className="mt-1 text-sm text-[#6B7280] font-body">{formatPrice(Number(form.price))}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
          Descripción
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber resize-none"
          placeholder="Descripción detallada del producto..."
        />
      </div>

      {/* Images */}
      <MultiImageUpload
        values={form.images}
        onChange={(urls) => setForm({ ...form, images: urls })}
        folder="equora/products"
      />

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={loading} className="flex-1">
          {product ? 'Guardar cambios' : 'Crear producto'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
