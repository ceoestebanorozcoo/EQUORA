import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import { getAuthUser } from '@/lib/auth';
import { deleteImage, deleteVideo } from '@/lib/cloudinary';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id).populate('category').lean();
    if (!product) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    return NextResponse.json({ success: true, data: JSON.parse(JSON.stringify(product)) });
  } catch {
    return NextResponse.json({ error: 'Error obteniendo producto' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const product = await Product.findByIdAndUpdate(id, body, { new: true }).populate('category');
    if (!product) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });

    return NextResponse.json({ success: true, data: product });
  } catch {
    return NextResponse.json({ error: 'Error actualizando producto' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);
    if (product?.images?.length) {
      await Promise.allSettled(product.images.map((url: string) => deleteImage(url)));
    }
    if (product?.video) {
      await deleteVideo(product.video).catch(() => {});
    }
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Producto eliminado' });
  } catch {
    return NextResponse.json({ error: 'Error eliminando producto' }, { status: 500 });
  }
}
