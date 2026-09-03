'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

const CATEGORIES = [
  { id: 'perjalanan', label: 'Perjalanan' },
  { id: 'kendaraan', label: 'Kendaraan' },
  { id: 'pelanggan', label: 'Pelanggan' },
  { id: 'general', label: 'Umum' },
];

const ORDER_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);

export default function GaleriCreate() {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [category, setCategory] = useState('perjalanan');
  const [location, setLocation] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(99);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setError('Upload foto terlebih dahulu');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from('gallery_items').insert({
        caption,
        image_url: imageUrl,
        category,
        location: location || null,
        display_order: displayOrder,
        is_active: isActive,
      });
      if (error) throw error;
      router.push('/admin/dashboard/galeri');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardLayout
      eyebrow="Galeri"
      title="Upload Foto"
      subtitle="Tambahkan foto dokumentasi baru ke galeri."
    >
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          {error && (
            <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Foto *
            </label>
            <ImageUpload
              bucket="gallery"
              onUpload={(url) => setImageUrl(url || null)}
              currentUrl={imageUrl}
              label="Upload Foto"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Caption / Judul *
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="Perjalanan keluarga ke Ciwidey"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Kategori *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Lokasi
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="Ciwidey, Cimahi, Bali..."
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Urutan Tampil
            </label>
            <select
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              {ORDER_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
              <option value={99}>99 — terakhir)</option>
            </select>
            <p className="text-xs text-muted mt-1">Angka lebih kecil tampil lebih dulu</p>
          </div>

          <div className="pt-4 border-t border-line">
            <ToggleField
              label="Tampilkan di Website"
              description="Foto muncul di halaman galeri publik"
              checked={isActive}
              onChange={setIsActive}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard/galeri')}
              className="px-5 py-2.5 border border-line rounded-xl text-sm font-medium text-heading hover:bg-surface/50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-accent text-white font-extrabold rounded-xl hover:bg-accent-hover disabled:opacity-50 shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] transition"
            >
              {loading ? 'Mengupload...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </AdminDashboardLayout>
  );
}

function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (c: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-start gap-3 p-3 rounded-xl border border-line hover:bg-accent/5 hover:border-accent transition text-left w-full"
    >
      <div
        className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${
          checked ? 'bg-accent' : 'bg-line'
        }`}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-heading">{label}</p>
        <p className="text-[11px] text-muted">{description}</p>
      </div>
    </button>
  );
}