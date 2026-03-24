import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { getAuthUser } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
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
    await Testimonial.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Testimonio eliminado' });
  } catch {
    return NextResponse.json({ error: 'Error eliminando testimonio' }, { status: 500 });
  }
}
