import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'equora/products';

    if (!file) return NextResponse.json({ error: 'Archivo requerido' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const url = await uploadImage(buffer, folder);
    return NextResponse.json({ success: true, url });
  } catch {
    return NextResponse.json({ error: 'Error subiendo imagen' }, { status: 500 });
  }
}
