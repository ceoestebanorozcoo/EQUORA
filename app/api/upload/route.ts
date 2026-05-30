import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { uploadImage, uploadVideo, deleteImage, deleteVideo } from '@/lib/cloudinary';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];
const ALLOWED_FOLDERS = ['equora/products', 'equora/categories', 'equora/products/videos'];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'equora/products';

    if (!file) return NextResponse.json({ error: 'Archivo requerido' }, { status: 400 });

    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    if (!isImage && !isVideo) {
      return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 });
    }
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Archivo demasiado grande' }, { status: 400 });
    }
    if (!ALLOWED_FOLDERS.includes(folder)) {
      return NextResponse.json({ error: 'Carpeta no válida' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

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
