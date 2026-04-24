import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { validateCode } from '@/lib/verificationCodes';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email y código requeridos' }, { status: 400 });
    }

    const valid = await validateCode(email, code, 'password-reset');
    if (!valid) {
      return NextResponse.json({ error: 'Código inválido o expirado' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error verificando código' }, { status: 500 });
  }
}
