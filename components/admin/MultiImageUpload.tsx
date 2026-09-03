'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, X, Image as ImageIcon, Star, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type MultiImageUploadProps = {
  bucket: 'vehicles' | 'packages' | 'articles' | 'gallery';
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  maxImages?: number;
};

export default function MultiImageUpload({
  bucket,
  images,
  onChange,
  label = 'Foto',
  maxImages = 10,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const upload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (jpg, png, webp)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB');
      return;
    }
    if (images.length >= maxImages) {
      setError(`Maksimal ${maxImages} foto`);
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
      onChange([...images, publicUrl]);
    } catch (e: any) {
      setError(e.message || 'Gagal upload gambar');
    } finally {
      setUploading(false);
    }
  };

  const remove = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const makePrimary = (idx: number) => {
    if (idx === 0) return;
    const next = [...images];
    const [item] = next.splice(idx, 1);
    next.unshift(item);
    onChange(next);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => upload(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
          {label}
        </label>
        <span className="text-[10px] text-muted font-mono">
          {images.length} / {maxImages}
        </span>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((url, idx) => (
            <div
              key={url}
              className="relative group aspect-square rounded-2xl overflow-hidden border border-line bg-surface"
            >
              <img
                src={url}
                alt={`${label} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />
              <div className="absolute top-2 left-2 flex gap-1">
                {idx === 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold">
                    Utama
                  </span>
                )}
              </div>
              <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => makePrimary(idx)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-heading hover:bg-accent hover:text-white transition"
                    title="Jadikan utama"
                  >
                    <Star size={12} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-error hover:bg-error hover:text-white transition"
                  title="Hapus"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length < maxImages && (
        <div
          onDragEnter={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={cn(
            'relative border-2 border-dashed rounded-2xl cursor-pointer transition-all p-6 text-center',
            dragActive ? 'border-accent bg-accent/5' : 'border-line hover:border-accent/40',
            uploading && 'opacity-50 pointer-events-none'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Upload size={18} />
            </div>
            <p className="text-xs font-bold text-heading">
              Klik atau tarik beberapa gambar sekaligus
            </p>
            <p className="text-[11px] text-muted">PNG, JPG, WEBP maksimal 5MB per file</p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-error flex items-center gap-1">
          <X size={12} /> {error}
        </p>
      )}
    </div>
  );
}