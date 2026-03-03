/* ═══════════════════════════════════════════════
   EQUORA — Shared TypeScript Interfaces
   ═══════════════════════════════════════════════ */

export interface Product {
    _id: string;
    name: string;
    category: ProductCategory;
    price: number;
    imageUrl: string;
    productCode: string;
    stockStatus: 'available' | 'soldout';
    createdAt: string;
}

export type ProductCategory =
    | 'Percheros'
    | 'Soportes'
    | 'Riendas'
    | 'Canasta'
    | 'Accesorios';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
    'Percheros',
    'Soportes',
    'Riendas',
    'Canasta',
    'Accesorios',
];

export interface ProductPayload {
    name: string;
    category: ProductCategory;
    price: number;
    imageUrl: string;
    stockStatus: 'available' | 'soldout';
}

export interface User {
    _id: string;
    email: string;
    role: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}
