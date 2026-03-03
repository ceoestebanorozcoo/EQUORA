'use client';

import { useState } from 'react';
import { FiUpload, FiX, FiLoader } from 'react-icons/fi';
import Image from 'next/image';
import { createProduct, updateProduct, uploadImage } from '@/lib/api';
import { PRODUCT_CATEGORIES } from '@/types';
import type { Product, ProductPayload } from '@/types';

interface ProductFormProps {
    product?: Product | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function ProductForm({ product, onClose, onSaved }: ProductFormProps) {
    const isEditing = !!product;

    const [form, setForm] = useState<ProductPayload>({
        name: product?.name || '',
        category: product?.category || '' as ProductPayload['category'],
        price: product?.price || 0,
        imageUrl: product?.imageUrl || '',
        stockStatus: product?.stockStatus || 'available',
    });

    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await uploadImage(formData);
            setForm((prev) => ({ ...prev, imageUrl: res.data.url }));
        } catch {
            setError('Error al subir la imagen');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.name || !form.category || !form.price || !form.imageUrl) {
            setError('Todos los campos son obligatorios');
            return;
        }

        setSaving(true);
        try {
            if (isEditing && product) {
                await updateProduct(product._id, form);
            } else {
                await createProduct(form);
            }
            onSaved();
        } catch {
            setError('Error al guardar el producto');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-golden/15">
                    <h2 className="font-display text-xl text-cocoa">
                        {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-olive/50 hover:text-cocoa transition-colors duration-300"
                    >
                        <FiX className="text-xl" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Error */}
                    {error && (
                        <div className="px-4 py-3 bg-wine/10 border border-wine/20 rounded-sm text-wine text-sm">
                            {error}
                        </div>
                    )}

                    {/* Name */}
                    <div>
                        <label className="block text-xs tracking-[0.2em] uppercase text-olive/70 mb-2 font-light">
                            Nombre del producto
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 bg-cream border border-golden/20 rounded-sm text-sm text-cocoa focus:outline-none focus:border-golden/50 focus:ring-1 focus:ring-golden/20 transition-all duration-300"
                            placeholder="Ej: Perchero Artesanal Noble"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-xs tracking-[0.2em] uppercase text-olive/70 mb-2 font-light">
                            Categoría
                        </label>
                        <select
                            value={form.category}
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value as ProductPayload['category'] })
                            }
                            className="w-full px-4 py-3 bg-cream border border-golden/20 rounded-sm text-sm text-cocoa focus:outline-none focus:border-golden/50 focus:ring-1 focus:ring-golden/20 transition-all duration-300"
                        >
                            <option value="">Seleccionar categoría</option>
                            {PRODUCT_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-xs tracking-[0.2em] uppercase text-olive/70 mb-2 font-light">
                            Precio (COP)
                        </label>
                        <input
                            type="number"
                            value={form.price || ''}
                            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                            className="w-full px-4 py-3 bg-cream border border-golden/20 rounded-sm text-sm text-cocoa focus:outline-none focus:border-golden/50 focus:ring-1 focus:ring-golden/20 transition-all duration-300"
                            placeholder="Ej: 150000"
                            min="0"
                        />
                    </div>

                    {/* Stock Status */}
                    <div>
                        <label className="block text-xs tracking-[0.2em] uppercase text-olive/70 mb-2 font-light">
                            Estado
                        </label>
                        <select
                            value={form.stockStatus}
                            onChange={(e) =>
                                setForm({ ...form, stockStatus: e.target.value as 'available' | 'soldout' })
                            }
                            className="w-full px-4 py-3 bg-cream border border-golden/20 rounded-sm text-sm text-cocoa focus:outline-none focus:border-golden/50 focus:ring-1 focus:ring-golden/20 transition-all duration-300"
                        >
                            <option value="available">Disponible</option>
                            <option value="soldout">Agotado</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-xs tracking-[0.2em] uppercase text-olive/70 mb-2 font-light">
                            Imagen del producto
                        </label>

                        {form.imageUrl ? (
                            <div className="relative aspect-video rounded-sm overflow-hidden border border-golden/20 mb-2">
                                <Image
                                    src={form.imageUrl}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => setForm({ ...form, imageUrl: '' })}
                                    className="absolute top-2 right-2 bg-cocoa/80 text-cream p-1.5 rounded-full hover:bg-wine transition-colors duration-300"
                                >
                                    <FiX className="text-sm" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-golden/20 rounded-sm cursor-pointer hover:border-golden/40 hover:bg-golden/5 transition-all duration-300">
                                {uploading ? (
                                    <FiLoader className="text-2xl text-olive/50 animate-spin" />
                                ) : (
                                    <>
                                        <FiUpload className="text-2xl text-olive/40 mb-2" />
                                        <span className="text-xs text-olive/50 font-light tracking-wider">
                                            Haz clic para subir imagen
                                        </span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 text-xs tracking-[0.2em] uppercase text-olive/70 font-light border border-golden/20 rounded-sm hover:bg-cream transition-all duration-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className="flex-1 px-4 py-3 text-xs tracking-[0.2em] uppercase bg-cocoa text-golden font-light rounded-sm hover:bg-caramel disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            {saving ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
