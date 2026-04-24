import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { createVerificationCode } from '@/lib/verificationCodes';
import { sendVerificationCode } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase(), role: 'admin' });
    if (!user) {
      return NextResponse.json({ error: 'No existe una cuenta de administrador con ese correo' }, { status: 404 });
    }

    const code = await createVerificationCode(email, 'password-reset');
    await sendVerificationCode(email, code, 'password-reset');

    return NextResponse.json({ success: true, message: 'Código enviado al email' });
  } catch {
    return NextResponse.json({ error: 'Error enviando el código' }, { status: 500 });
  }
}
