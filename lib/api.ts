/* ═══════════════════════════════════════════════
   EQUORA — API Client (Axios)
   Frontend consumes all backend routes via this module
   ═══════════════════════════════════════════════ */

import axios from 'axios';
import type { Product, LoginPayload, ProductPayload } from '@/types';

const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
});

/* ── Auth ── */

export const login = (data: LoginPayload) =>
    api.post('/auth/login', data);

export const logout = () =>
    api.post('/auth/logout');

export const getMe = () =>
    api.get<{ _id: string; email: string; role: string }>('/auth/me');

/* ── Products ── */

export const getProducts = (params?: { search?: string; category?: string }) =>
    api.get<Product[]>('/products', { params });

export const createProduct = (data: ProductPayload) =>
    api.post<Product>('/products', data);

export const updateProduct = (id: string, data: Partial<ProductPayload>) =>
    api.put<Product>(`/products/${id}`, data);

export const deleteProduct = (id: string) =>
    api.delete(`/products/${id}`);

/* ── Image Upload ── */

export const uploadImage = (formData: FormData) =>
    api.post<{ url: string }>('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
