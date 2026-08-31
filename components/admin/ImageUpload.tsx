'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

type ImageUploadProps = {
  bucket: 'vehicles' | 'packages' | 'articles';
  onUpload: (url: string | null) => void;
  currentUrl?: string | null;
  label?: string;
};

export default function ImageUpload({ bucket, onUpload, currentUrl, label = 'Gambar' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (jpg, png, webp)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      setPreview(publicUrl);
      onUpload(publicUrl);
    } catch (e: any) {
      setError(e.message || 'Gagal upload gambar');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="space-y-3">
      <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-1">
        {label}
      </label>
      
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={cn(
          'relative border-2 border-dashed rounded-[18px] cursor-pointer transition-all',
          dragActive ? 'border-accent bg-accent/5' : 'border-line hover:border-accent/40',
          uploading && 'opacity-50 pointer-events-none'
        )}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && triggerFileInput()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {preview ? (
          <div className="aspect-[16/10] relative overflow-hidden rounded-[16px]">
            <img
              src={preview}
              alt={`${label} preview`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleRemove(); }}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-error/90 text-white hover:bg-error transition"
            >
              <X size={14} />
            </button>
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <div className="animate-spin rounded-full h-8 w-8 border-3 border-accent border-t-transparent" />
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 px-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-accent">
                <Upload size={24} />
              </div>
              <p className="text-sm font-extrabold text-heading">Klik atau tarik gambar</p>
              <p className="text-xs text-muted">PNG, JPG, WEBP maksimal 5MB</p>
            </div>
          </div>
        )}

        <ImageIcon size={20} className="absolute bottom-2 right-2 text-muted/50" />
      </div>

      {error && (
        <p className="text-xs text-error flex items-center gap-1">
          <X size={12} />
          {error}
        </p>
      )}
    </div>
  );
}