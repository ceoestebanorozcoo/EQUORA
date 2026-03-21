import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth';
import { createVerificationCode } from '@/lib/verificationCodes';
import { sendVerificationCode } from '@/lib/mailer';

export async function POST() {
  try {
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const code = await createVerificationCode(user.email, 'change-password');
    await sendVerificationCode(user.email, code, 'change-password');

    return NextResponse.json({ success: true, message: 'Código enviado a tu email' });
  } catch {
    return NextResponse.json({ error: 'Error procesando la solicitud' }, { status: 500 });
  }
}
