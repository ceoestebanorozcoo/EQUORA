'use client';

import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { deleteProduct } from '@/lib/api';
import type { IProduct } from '@/types';

interface DeleteModalProps {
    product: IProduct;
    onClose: () => void;
    onDeleted: () => void;
}

export default function DeleteModal({ product, onClose, onDeleted }: DeleteModalProps) {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteProduct(product._id);
            onDeleted();
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 text-center">
                {/* Icon */}
                <div className="mx-auto w-14 h-14 rounded-full bg-wine/10 flex items-center justify-center mb-5">
                    <FiAlertTriangle className="text-2xl text-wine" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-cocoa mb-2">
                    Eliminar Producto
                </h3>

                {/* Description */}
                <p className="text-sm text-olive/70 font-light mb-1">
                    ¿Estás seguro de que deseas eliminar{' '}
                    <span className="font-medium text-cocoa">&ldquo;{product.name}&rdquo;</span>?
                </p>
                <p className="text-xs text-olive/50 font-light mb-6">
                    Código: {product.productCode} · Esta acción no se puede deshacer.
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 text-xs tracking-[0.2em] uppercase text-olive/70 font-light border border-golden/20 rounded-sm hover:bg-cream transition-all duration-300"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 px-4 py-3 text-xs tracking-[0.2em] uppercase bg-wine text-cream font-light rounded-sm hover:bg-wine/80 disabled:opacity-50 transition-all duration-300"
                    >
                        {deleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
