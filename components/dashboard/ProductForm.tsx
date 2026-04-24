'use client';

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import api from '@/lib/axios';
import { IProduct, ICategory } from '@/types';
import Button from '@/components/ui/Button';
import MultiImageUpload from './MultiImageUpload';
import { formatPrice } from '@/utils/formatPrice';
import { IoVideocamOutline, IoCloseCircle } from 'react-icons/io5';

interface ProductFormProps {
  product?: IProduct | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export interface ProductFormHandle {
  cleanup: () => void;
}

async function deleteAsset(url: string) {
  if (!url) return;
  try {
    await fetch('/api/upload', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ url }),
    });
  } catch {}
}

const ProductForm = forwardRef<ProductFormHandle, ProductFormProps>(function ProductForm({ product, onSuccess, onCancel }, ref) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoError, setVideoError] = useState('');
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoStatus, setVideoStatus] = useState('');
  const videoInputRef = useRef<HTMLInputElement>(null);
  const videoErrorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track URLs uploaded in this session (not yet persisted to DB)
  const pendingUploads = useRef<Set<string>>(new Set());

  useImperativeHandle(ref, () => ({
    cleanup: () => {
      pendingUploads.current.forEach((url) => deleteAsset(url));
      pendingUploads.current.clear();
    },
  }));

  const [form, setForm] = useState({
    name: product?.name || '',
    category: (product?.category as ICategory)?._id || '',
    price: product?.price?.toString() || '',
    images: product?.images || [],
    video: product?.video || '',
    description: product?.description || '',
    stockStatus: product?.stockStatus || 'available',
  });

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.data || []));
  }, []);

  const showVideoError = (msg: string) => {
    if (videoErrorTimer.current) clearTimeout(videoErrorTimer.current);
    setVideoError(msg);
    videoErrorTimer.current = setTimeout(() => setVideoError(''), 5000);
  };

  const getVideoDuration = (file: File): Promise<number> =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => { URL.revokeObjectURL(url); resolve(video.duration); };
      video.onerror = () => { URL.revokeObjectURL(url); reject(); };
      video.src = url;
      video.load();
    });

  const compressVideo = (file: File): Promise<File> =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.src = url;
      video.muted = true;
      video.onloadedmetadata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = Math.min(video.videoWidth, 854);
        canvas.height = Math.round(canvas.width * (video.videoHeight / video.videoWidth));
        const ctx = canvas.getContext('2d')!;
        const stream = canvas.captureStream(24);

        const audioCtx = new AudioContext();
        const src = audioCtx.createMediaElementSource(video);
        const dest = audioCtx.createMediaStreamDestination();
        src.connect(dest);
        src.connect(audioCtx.destination);
        dest.stream.getAudioTracks().forEach((t) => stream.addTrack(t));

        const chunks: Blob[] = [];
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8,opus', videoBitsPerSecond: 600_000 });
        recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
        recorder.onstop = () => {
          URL.revokeObjectURL(url);
          audioCtx.close();
          const blob = new Blob(chunks, { type: 'video/webm' });
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webm'), { type: 'video/webm' }));
        };
        recorder.onerror = () => { URL.revokeObjectURL(url); reject(); };

        const drawFrame = () => {
          if (video.ended || video.paused) return;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          requestAnimationFrame(drawFrame);
        };

        recorder.start();
        video.play().then(() => drawFrame());
        video.onended = () => recorder.stop();
      };
      video.onerror = () => { URL.revokeObjectURL(url); reject(); };
      video.load();
    });

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoUploading(true);
    setVideoStatus('Verificando...');
    setVideoError('');
    try {
      let duration: number;
      try {
        duration = await getVideoDuration(file);
      } catch {
        showVideoError('No se pudo leer el video. Intenta con otro archivo.');
        return;
      }

      if (duration > 180) {
        showVideoError('No se pueden subir videos mayores a 3 minutos.');
        return;
      }

      let fileToUpload = file;
      if (file.size > 5 * 1024 * 1024) {
        setVideoStatus('Comprimiendo...');
        try {
          fileToUpload = await compressVideo(file);
        } catch {
          showVideoError('No se pudo comprimir el video. Intenta con un archivo más pequeño.');
          return;
        }
      }

      setVideoStatus('Subiendo...');
      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('folder', 'equora/products/videos');
      const res = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const uploadedUrl: string = res.data.url;
      pendingUploads.current.add(uploadedUrl);
      setForm((f) => ({ ...f, video: uploadedUrl }));
    } catch {
      showVideoError('Error subiendo el video. Inténtalo de nuevo.');
    } finally {
      setVideoUploading(false);
      setVideoStatus('');
      if (videoInputRef.current) videoInputRef.current.value = '';
    }
  };

  const handleRemoveVideo = () => {
    const url = form.video;
    if (url) {
      pendingUploads.current.delete(url);
      deleteAsset(url);
    }
    setForm((f) => ({ ...f, video: '' }));
  };

  const handleImagesChange = (newUrls: string[]) => {
    const oldUrls = form.images;
    // Track new uploads as pending
    newUrls.filter((u) => !oldUrls.includes(u)).forEach((u) => pendingUploads.current.add(u));
    // Delete removed URLs from Cloudinary immediately
    oldUrls.filter((u) => !newUrls.includes(u)).forEach((u) => {
      pendingUploads.current.delete(u);
      deleteAsset(u);
    });
    setForm((f) => ({ ...f, images: newUrls }));
  };

  const handleCancel = () => {
    // Delete any uploads that were never saved to DB
    pendingUploads.current.forEach((url) => deleteAsset(url));
    pendingUploads.current.clear();
    onCancel();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.category || !form.price) {
      setError('Nombre, categoría y precio son requeridos');
      return;
    }

    setLoading(true);
    try {
      if (product) {
        await api.put(`/products/${product._id}`, { ...form, price: Number(form.price) });
      } else {
        await api.post('/products', { ...form, price: Number(form.price) });
      }
      pendingUploads.current.clear();
      onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error guardando producto';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-body" role="alert">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
          Nombre del producto *
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber"
          placeholder="Ej: Perchero para montura"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
          Categoría *
        </label>
        <select
          id="category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber cursor-pointer"
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
          Precio (COP) *
        </label>
        <input
          id="price"
          type="number"
          min="0"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber"
          placeholder="Ej: 85000"
          required
        />
        {form.price && !isNaN(Number(form.price)) && (
          <p className="mt-1 text-sm text-[#6B7280] font-body">{formatPrice(Number(form.price))}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
          Descripción
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-equora-amber/30 focus:border-equora-amber resize-none"
          placeholder="Descripción detallada del producto..."
        />
      </div>

      {/* Images */}
      <MultiImageUpload
        values={form.images}
        onChange={handleImagesChange}
        folder="equora/products"
      />

      {/* Video */}
      <div>
        <label className="block text-sm font-medium text-equora-dark mb-1.5 font-body">
          Video del producto <span className="text-gray-400 font-normal">(opcional)</span>
        </label>
        {form.video ? (
          <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black">
            <video src={form.video} controls className="w-full max-h-48 object-contain" />
            <button
              type="button"
              onClick={handleRemoveVideo}
              className="absolute top-2 right-2 text-white bg-black/60 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
              aria-label="Eliminar video"
            >
              <IoCloseCircle size={24} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => !videoUploading && videoInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl px-4 py-6 cursor-pointer hover:border-equora-amber/50 hover:bg-equora-amber/5 transition-all duration-200"
          >
            {videoUploading ? (
              <div className="flex items-center gap-2 text-equora-amber">
                <div className="w-4 h-4 border-2 border-equora-amber/30 border-t-equora-amber rounded-full animate-spin" />
                <span className="font-body text-sm">{videoStatus || 'Subiendo video...'}</span>
              </div>
            ) : (
              <>
                <IoVideocamOutline size={28} className="text-gray-400" />
                <p className="font-body text-sm text-gray-400 text-center">
                  Haz clic para subir un video corto del producto
                </p>
                <p className="font-body text-xs text-gray-300">MP4, MOV, WebM — máx. 3 min</p>
              </>
            )}
          </div>
        )}

        {videoError && (
          <div className="mt-2 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-body" role="alert">
            <span>{videoError}</span>
          </div>
        )}

        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="hidden"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={loading} className="flex-1">
          {product ? 'Guardar cambios' : 'Crear producto'}
        </Button>
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
});

export default ProductForm;
