import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import { getAuthUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const { productIds } = await req.json();

    if (!Array.isArray(productIds) || productIds.length > 12) {
      return NextResponse.json({ error: 'Máximo 12 productos destacados' }, { status: 400 });
    }

    // Unset all featured, then set the new ones
    await Product.updateMany({}, { isFeatured: false });
    if (productIds.length > 0) {
      await Product.updateMany({ _id: { $in: productIds } }, { isFeatured: true });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error actualizando destacados' }, { status: 500 });
  }
}
