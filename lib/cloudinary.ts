import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export function getPublicId(url: string): string {
  // Works for both image and video Cloudinary URLs
  // e.g. https://res.cloudinary.com/xxx/video/upload/v123/equora/products/videos/abc.mp4 → equora/products/videos/abc
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : '';
}

export async function deleteImage(url: string): Promise<void> {
  const publicId = getPublicId(url);
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
}

export async function deleteVideo(url: string): Promise<void> {
  const publicId = getPublicId(url);
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
}

export async function uploadImage(
  file: Buffer,
  folder: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result!.secure_url);
      })
      .end(file);
  });
}

export async function uploadVideo(
  file: Buffer,
  folder: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: 'video' }, (error, result) => {
        if (error) return reject(error);
        resolve(result!.secure_url);
      })
      .end(file);
  });
}
