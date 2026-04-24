import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { uploadImage, uploadVideo, deleteImage, deleteVideo } from '@/lib/cloudinary';

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

    const isVideo = file.type.startsWith('video/');
    const url = isVideo ? await uploadVideo(buffer, folder) : await uploadImage(buffer, folder);
    return NextResponse.json({ success: true, url });
  } catch {
    return NextResponse.json({ error: 'Error subiendo archivo' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'URL requerida' }, { status: 400 });
    if (url.includes('/video/')) await deleteVideo(url);
    else await deleteImage(url);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Error eliminando archivo' }, { status: 500 });
  }
}
