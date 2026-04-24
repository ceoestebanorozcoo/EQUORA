import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Category from '@/models/Category';
import { getAuthUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const { categoryIds } = await req.json();

    if (!Array.isArray(categoryIds) || categoryIds.length > 4) {
      return NextResponse.json({ error: 'Máximo 4 categorías destacadas' }, { status: 400 });
    }

    await Category.updateMany({}, { isFeatured: false });
    if (categoryIds.length > 0) {
      await Category.updateMany({ _id: { $in: categoryIds } }, { isFeatured: true });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error actualizando categorías destacadas' }, { status: 500 });
  }
}
