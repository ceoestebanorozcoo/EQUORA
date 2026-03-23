import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ active: true }).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, data: testimonials });
  } catch {
    return NextResponse.json({ error: 'Error obteniendo testimonios' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const { name, role, text, rating } = body;

    if (!name || !text) {
      return NextResponse.json({ error: 'Nombre y testimonio son requeridos' }, { status: 400 });
    }

    const count = await Testimonial.countDocuments();
    const testimonial = await Testimonial.create({
      name,
      role: role || 'Cliente',
      text,
      rating: rating || 5,
      order: count,
    });

    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creando testimonio' }, { status: 500 });
  }
}
