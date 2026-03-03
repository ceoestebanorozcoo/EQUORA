/* ═══════════════════════════════════════════════
   EQUORA — GET & POST /api/products
   ═══════════════════════════════════════════════ */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import { verifyToken } from '@/lib/auth';

/* ── Public: list products ── */
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search');
        const category = searchParams.get('category');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: any = {};
        if (search) filter.name = { $regex: search, $options: 'i' };
        if (category && category !== 'Todas') filter.category = category;

        const products = await Product.find(filter).sort({ createdAt: -1 });
        return NextResponse.json(products);
    } catch (error) {
        console.error('Get products error:', error);
        return NextResponse.json(
            { error: 'Error al obtener productos' },
            { status: 500 }
        );
    }
}

/* ── Protected: create product ── */
export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get('equora_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();

        const { name, category, price, imageUrl, stockStatus } = body;
        if (!name || !category || price == null || !imageUrl) {
            return NextResponse.json(
                { error: 'Faltan campos obligatorios' },
                { status: 400 }
            );
        }

        // Auto-generate product code: 2 random letters and 4 random numbers (e.g., AD3062)
        const generateRandomLetters = (length: number) => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        };

        const generateRandomNumbers = (length: number) => {
            const numbers = '0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }
            return result;
        };

        let productCode = '';
        let isUnique = false;

        while (!isUnique) {
            const letters = generateRandomLetters(2);
            const numbers = generateRandomNumbers(4);
            productCode = `${letters}${numbers}`;

            const existingProduct = await Product.findOne({ productCode });
            if (!existingProduct) {
                isUnique = true;
            }
        }

        const product = await Product.create({
            name,
            category,
            price,
            imageUrl,
            stockStatus: stockStatus || 'available',
            productCode,
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Create product error:', error);
        return NextResponse.json(
            { error: 'Error al crear producto' },
            { status: 500 }
        );
    }
}
