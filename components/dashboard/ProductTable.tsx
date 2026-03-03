'use client';

import Image from 'next/image';
import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { updateProduct } from '@/lib/api';
import type { Product } from '@/types';

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
    onRefresh: () => void;
}

export default function ProductTable({ products, onEdit, onDelete, onRefresh }: ProductTableProps) {
    const toggleStock = async (product: Product) => {
        try {
            const newStatus = product.stockStatus === 'available' ? 'soldout' : 'available';
            await updateProduct(product._id, { stockStatus: newStatus });
            onRefresh();
        } catch (error) {
            console.error('Error toggling stock:', error);
        }
    };

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(price);

    if (products.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-lg border border-golden/15">
                <p className="text-olive/50 font-light tracking-wider text-sm">
                    No hay productos registrados
                </p>
                <p className="text-olive/30 font-light text-xs mt-2">
                    Crea tu primer producto para comenzar
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-golden/15 overflow-hidden shadow-sm">
            {/* ── Desktop Table ── */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-golden/15 bg-cream/50">
                            <th className="text-left px-6 py-4 text-[10px] tracking-[0.3em] uppercase text-olive/60 font-light">
                                Producto
                            </th>
                            <th className="text-left px-4 py-4 text-[10px] tracking-[0.3em] uppercase text-olive/60 font-light">
                                Categoría
                            </th>
                            <th className="text-left px-4 py-4 text-[10px] tracking-[0.3em] uppercase text-olive/60 font-light">
                                Código
                            </th>
                            <th className="text-left px-4 py-4 text-[10px] tracking-[0.3em] uppercase text-olive/60 font-light">
                                Precio
                            </th>
                            <th className="text-left px-4 py-4 text-[10px] tracking-[0.3em] uppercase text-olive/60 font-light">
                                Estado
                            </th>
                            <th className="text-right px-6 py-4 text-[10px] tracking-[0.3em] uppercase text-olive/60 font-light">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product._id}
                                className="border-b border-golden/8 hover:bg-golden/5 transition-colors duration-200"
                            >
                                {/* Product */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-sm overflow-hidden flex-shrink-0 border border-golden/10">
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-cocoa">
                                            {product.name}
                                        </span>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-4 py-4">
                                    <span className="text-xs text-olive/70 font-light">
                                        {product.category}
                                    </span>
                                </td>

                                {/* Code */}
                                <td className="px-4 py-4">
                                    <span className="text-xs text-olive/50 font-mono tracking-wider">
                                        {product.productCode}
                                    </span>
                                </td>

                                {/* Price */}
                                <td className="px-4 py-4">
                                    <span className="text-sm text-caramel font-medium">
                                        {formatPrice(product.price)}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-4">
                                    <span
                                        className={`inline-block text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-light ${product.stockStatus === 'available'
                                            ? 'bg-olive/10 text-olive'
                                            : 'bg-wine/10 text-wine'
                                            }`}
                                    >
                                        {product.stockStatus === 'available' ? 'Disponible' : 'Agotado'}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => toggleStock(product)}
                                            title="Cambiar estado"
                                            className="p-2 text-olive/50 hover:text-caramel hover:bg-golden/10 rounded-sm transition-all duration-200"
                                        >
                                            {product.stockStatus === 'available' ? (
                                                <FiToggleRight className="text-lg" />
                                            ) : (
                                                <FiToggleLeft className="text-lg" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => onEdit(product)}
                                            title="Editar"
                                            className="p-2 text-olive/50 hover:text-caramel hover:bg-golden/10 rounded-sm transition-all duration-200"
                                        >
                                            <FiEdit2 className="text-sm" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(product)}
                                            title="Eliminar"
                                            className="p-2 text-olive/50 hover:text-wine hover:bg-wine/10 rounded-sm transition-all duration-200"
                                        >
                                            <FiTrash2 className="text-sm" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Mobile Cards ── */}
            <div className="md:hidden divide-y divide-golden/10">
                {products.map((product) => (
                    <div key={product._id} className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14 rounded-sm overflow-hidden flex-shrink-0 border border-golden/10">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="56px"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-cocoa truncate">{product.name}</h4>
                                <p className="text-xs text-olive/50 font-mono">Cód: {product.productCode}</p>
                            </div>
                            <span
                                className={`text-[10px] tracking-wider uppercase px-2 py-1 rounded-full font-light ${product.stockStatus === 'available'
                                    ? 'bg-olive/10 text-olive'
                                    : 'bg-wine/10 text-wine'
                                    }`}
                            >
                                {product.stockStatus === 'available' ? 'Disp.' : 'Agot.'}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-olive/60">{product.category}</span>
                                <span className="text-sm text-caramel font-medium">{formatPrice(product.price)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => toggleStock(product)} className="p-2 text-olive/50 hover:text-caramel">
                                    {product.stockStatus === 'available' ? <FiToggleRight /> : <FiToggleLeft />}
                                </button>
                                <button onClick={() => onEdit(product)} className="p-2 text-olive/50 hover:text-caramel">
                                    <FiEdit2 className="text-sm" />
                                </button>
                                <button onClick={() => onDelete(product)} className="p-2 text-olive/50 hover:text-wine">
                                    <FiTrash2 className="text-sm" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
