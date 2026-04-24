import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { getAuthUser } from '@/lib/auth';
import { deleteImage } from '@/lib/cloudinary';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const { name, image } = await req.json();

    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug, image },
      { new: true }
    );
    if (!category) return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 });

    return NextResponse.json({ success: true, data: category });
  } catch {
    return NextResponse.json({ error: 'Error actualizando categoría' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const { id } = await params;

    const productsCount = await Product.countDocuments({ category: id });
    if (productsCount > 0) {
      return NextResponse.json(
        { error: `No se puede eliminar: hay ${productsCount} producto(s) asociado(s) a esta categoría` },
        { status: 400 }
      );
    }

    const category = await Category.findById(id);
    if (category?.image) {
      await deleteImage(category.image).catch(() => {});
    }
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Categoría eliminada' });
  } catch {
    return NextResponse.json({ error: 'Error eliminando categoría' }, { status: 500 });
  }
}
