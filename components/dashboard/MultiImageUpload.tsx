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

  const handleFiles = async (files: FileList) => {
    const remaining = max - values.length;
    if (remaining <= 0) { setError(`Máximo ${max} imágenes`); return; }

    const toUpload = Array.from(files).slice(0, remaining);
    setError('');
    setUploading(true);

    const uploaded: string[] = [];
    for (const file of toUpload) {
      if (!file.type.startsWith('image/')) continue;
      if (file.size > 5 * 1024 * 1024) { setError('Cada imagen debe ser menor a 5MB'); continue; }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData, credentials: 'include' });
        const data = await res.json();
        if (data.url) uploaded.push(data.url);
        else setError(data.error || 'Error subiendo imagen');
      } catch {
        setError('Error subiendo imagen');
      }
    }

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
                <span className="absolute bottom-1 left-1 bg-equora-dark/70 text-white text-xs font-body px-1.5 py-0.5 rounded">
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
              <p className="font-body text-xs text-[#6B7280]">PNG, JPG, WebP — máx. 5MB c/u</p>
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
