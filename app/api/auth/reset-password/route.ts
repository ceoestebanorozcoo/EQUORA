import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { validateAndDeleteCode } from '@/lib/verificationCodes';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, code, newPassword } = await req.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }

    const valid = await validateAndDeleteCode(email, code, 'password-reset');
    if (!valid) {
      return NextResponse.json({ error: 'Código inválido o expirado' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await User.findOneAndUpdate({ email: email.toLowerCase() }, { password: hashed });

    return NextResponse.json({ success: true, message: 'Contraseña actualizada correctamente' });
  } catch {
    return NextResponse.json({ error: 'Error actualizando contraseña' }, { status: 500 });
  }
}
