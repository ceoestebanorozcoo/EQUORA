import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Category from '@/models/Category';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ name: 1 });
    return NextResponse.json({ success: true, data: categories });
  } catch {
    return NextResponse.json({ error: 'Error obteniendo categorías' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const { name, image } = await req.json();

    if (!name) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 });

    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const category = await Category.create({ name, slug, image });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error && err.message.includes('duplicate')
      ? 'Ya existe una categoría con ese nombre'
      : 'Error creando categoría';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
