import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL!;
    const password = process.env.ADMIN_PASSWORD!;

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Admin ya existe' }, { status: 200 });
    }

    const hashed = await bcrypt.hash(password, 12);
    await User.create({ email, password: hashed, role: 'admin' });

    return NextResponse.json({ success: true, message: 'Admin creado correctamente' });
  } catch (err: unknown) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error('[SEED ERROR]', detail);
    return NextResponse.json({ error: 'Error creando admin', detail }, { status: 500 });
  }
}
