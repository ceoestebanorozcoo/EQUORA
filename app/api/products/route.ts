import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import { getAuthUser } from '@/lib/auth';
import { generateProductCode } from '@/utils/generateProductCode';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const featured = req.nextUrl.searchParams.get('featured');
    const search = req.nextUrl.searchParams.get('search');
    const filter: Record<string, unknown> = featured === 'true' ? { isFeatured: true } : {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    const products = await Product.find(filter).populate('category').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch {
    return NextResponse.json({ error: 'Error obteniendo productos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const { name, category, price, images, video, description, stockStatus } = body;

    if (!name || !category || !price) {
      return NextResponse.json({ error: 'Nombre, categoría y precio son requeridos' }, { status: 400 });
    }

    const productCode = await generateProductCode();

    const product = await Product.create({
      name,
      category,
      price: Number(price),
      images: images || [],
      video: video || '',
      description: description || '',
      productCode,
      stockStatus: stockStatus || 'available',
    });

    const populated = await product.populate('category');
    return NextResponse.json({ success: true, data: populated }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creando producto' }, { status: 500 });
  }
}
