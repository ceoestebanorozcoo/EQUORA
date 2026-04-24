'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { IoCloudUpload, IoClose } from 'react-icons/io5';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove?: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  folder = 'equora/products',
  label = 'Imagen del producto',
}: ImageUploadProps) {
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

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes');
      return;
    }

    setUploading(true);
    setError('');

    let fileToUpload = file;
    if (file.size > 5 * 1024 * 1024) {
      try {
        fileToUpload = await compressImage(file);
      } catch {
        setError('No se pudo comprimir la imagen');
        setUploading(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('folder', folder);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData, credentials: 'include' });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setError(data.error || 'Error subiendo imagen');
    } catch {
      setError('Error subiendo imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    if (value) onRemove?.(value);
    onChange('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-equora-dark mb-2 font-body">{label}</label>

      {value ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 group">
          <Image src={value} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Eliminar imagen"
          >
            <IoClose size={16} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          className="w-full h-48 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-equora-amber hover:bg-equora-ivory/30 transition-colors"
          role="button"
          aria-label="Subir imagen"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        >
          {uploading ? (
            <>
              <div className="w-8 h-8 border-2 border-equora-amber border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              <p className="font-body text-sm text-[#6B7280]">Subiendo...</p>
            </>
          ) : (
            <>
              <IoCloudUpload size={32} className="text-equora-amber" aria-hidden="true" />
              <p className="font-body text-sm text-[#6B7280] text-center">
                Arrastra una imagen o <span className="text-equora-amber font-medium">haz clic aquí</span>
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
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
        aria-hidden="true"
      />
    </div>
  );
}
