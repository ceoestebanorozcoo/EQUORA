import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { getAuthUser, COOKIE_NAME } from '@/lib/auth';
import { validateAndDeleteCode } from '@/lib/verificationCodes';

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    await connectDB();
    const { code, type, newEmail, newPassword } = await req.json();

    if (!code || !type) {
      return NextResponse.json({ error: 'Código y tipo requeridos' }, { status: 400 });
    }

    if (type === 'change-email') {
      if (!newEmail) return NextResponse.json({ error: 'Nuevo email requerido' }, { status: 400 });

      // Validate code against CURRENT email (identity verification)
      const valid = await validateAndDeleteCode(authUser.email, code, 'change-email');
      if (!valid) return NextResponse.json({ error: 'Código inválido o expirado' }, { status: 400 });

      // Check new email is not already in use
      const existing = await User.findOne({ email: newEmail.toLowerCase() });
      if (existing) return NextResponse.json({ error: 'Este email ya está en uso' }, { status: 400 });

      await User.findByIdAndUpdate(authUser.userId, { email: newEmail.toLowerCase() });

      const res = NextResponse.json({ success: true, message: 'Email actualizado. Por favor inicia sesión nuevamente.' });
      res.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
      return res;
    }

    if (type === 'change-password') {
      if (!newPassword) return NextResponse.json({ error: 'Nueva contraseña requerida' }, { status: 400 });

      // Validate code against current email (identity verification)
      const valid = await validateAndDeleteCode(authUser.email, code, 'change-password');
      if (!valid) return NextResponse.json({ error: 'Código inválido o expirado' }, { status: 400 });

      const hashed = await bcrypt.hash(newPassword, 12);
      await User.findByIdAndUpdate(authUser.userId, { password: hashed });

      const res = NextResponse.json({ success: true, message: 'Contraseña actualizada. Por favor inicia sesión nuevamente.' });
      res.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
      return res;
    }

    return NextResponse.json({ error: 'Tipo no válido' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Error procesando la solicitud' }, { status: 500 });
  }
}
