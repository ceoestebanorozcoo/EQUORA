'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { IoCloudUpload, IoClose } from 'react-icons/io5';

interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  max?: number;
}

export default function MultiImageUpload({
  values,
  onChange,
  folder = 'equora/products',
  max = 6,
}: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const compressImage = (file: File): Promise<File> =>
    new Promise((resolve, reject) => {
      const img = new window.Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const MAX_PX = 2048;
        let { width, height } = img;
        if (width > MAX_PX || height > MAX_PX) {
          if (width > height) { height = Math.round(height * MAX_PX / width); width = MAX_PX; }
          else { width = Math.round(width * MAX_PX / height); height = MAX_PX; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
        // Step down quality until under 5MB
        const tryQuality = (q: number) => {
          canvas.toBlob((blob) => {
            if (!blob) return reject();
            if (blob.size <= 5 * 1024 * 1024 || q <= 0.1) {
              resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }));
            } else {
              tryQuality(Math.max(q - 0.1, 0.1));
            }
          }, 'image/jpeg', q);
        };
        tryQuality(0.85);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(); };
      img.src = url;
    });

  const handleFiles = async (files: FileList) => {
    const remaining = max - values.length;
    if (remaining <= 0) { setError(`Máximo ${max} imágenes`); return; }

    const toUpload = Array.from(files).slice(0, remaining);
    setError('');
    setUploading(true);

    const validFiles = toUpload.filter((file) => file.type.startsWith('image/'));

    const preparedFiles = await Promise.all(
      validFiles.map(async (file) => {
        if (file.size > 5 * 1024 * 1024) {
          try { return await compressImage(file); } catch { return null; }
        }
        return file;
      })
    );
    const filesToUpload = preparedFiles.filter((f): f is File => f !== null);

    const results = await Promise.allSettled(
      filesToUpload.map((file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);
        return fetch('/api/upload', { method: 'POST', body: formData, credentials: 'include' })
          .then((res) => res.json())
          .then((data) => data.url as string);
      })
    );

    const uploaded = results
      .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled' && !!r.value)
      .map((r) => r.value);

    if (results.some((r) => r.status === 'rejected')) setError('Algunas imágenes no se pudieron subir');
    if (uploaded.length) onChange([...values, ...uploaded]);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-equora-dark mb-2 font-body">
        Imágenes del producto <span className="text-[#6B7280] font-normal">({values.length}/{max})</span>
      </label>

      {/* Previews */}
      {values.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {values.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
              <Image src={url} alt={`Imagen ${i + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                aria-label={`Eliminar imagen ${i + 1}`}
              >
                <IoClose size={12} aria-hidden="true" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 bg-equora-navy/70 text-white text-xs font-body px-1.5 py-0.5 rounded">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      {values.length < max && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
          className="w-full h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-equora-amber hover:bg-equora-ivory/30 transition-colors"
          role="button"
          aria-label="Subir imágenes"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        >
          {uploading ? (
            <>
              <div className="w-6 h-6 border-2 border-equora-amber border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              <p className="font-body text-xs text-[#6B7280]">Subiendo...</p>
            </>
          ) : (
            <>
              <IoCloudUpload size={24} className="text-equora-amber" aria-hidden="true" />
              <p className="font-body text-xs text-[#6B7280] text-center">
                Arrastra imágenes o <span className="text-equora-amber font-medium">haz clic</span>
              </p>
              <p className="font-body text-xs text-[#6B7280]">PNG, JPG, WebP — se comprimen automáticamente</p>
            </>
          )}
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-500 font-body">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ''; }}
        aria-hidden="true"
      />
    </div>
  );
}
