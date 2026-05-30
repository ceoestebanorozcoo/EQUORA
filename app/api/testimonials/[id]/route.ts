import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { getAuthUser } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }
    const body = await req.json();
    const { name, role, text, rating, active, order } = body;
    if (rating !== undefined) {
      const r = Number(rating);
      if (!Number.isInteger(r) || r < 1 || r > 5) {
        return NextResponse.json({ error: 'Rating debe ser entre 1 y 5' }, { status: 400 });
      }
    }
    const update = { name, role, text, rating, active, order };

    const testimonial = await Testimonial.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!testimonial) return NextResponse.json({ error: 'Testimonio no encontrado' }, { status: 404 });

    return NextResponse.json({ success: true, data: testimonial });
  } catch {
    return NextResponse.json({ error: 'Error actualizando testimonio' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }
    await Testimonial.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Testimonio eliminado' });
  } catch {
    return NextResponse.json({ error: 'Error eliminando testimonio' }, { status: 500 });
  }
}
