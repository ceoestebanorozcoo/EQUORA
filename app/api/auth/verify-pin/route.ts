import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getAuthUser } from '@/lib/auth';
import { validateCode } from '@/lib/verificationCodes';

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUser();
    if (!authUser) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    await connectDB();
    const { code, type } = await req.json();

    if (!code || !type) return NextResponse.json({ error: 'Código y tipo requeridos' }, { status: 400 });

    const valid = await validateCode(authUser.email, code, type);
    if (!valid) return NextResponse.json({ error: 'Código incorrecto o expirado' }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error verificando código' }, { status: 500 });
  }
}
