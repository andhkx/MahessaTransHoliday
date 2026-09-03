'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ImageUpload from '@/components/admin/ImageUpload';
import { Check } from 'lucide-react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

const CATEGORIES = [
  { id: 'perjalanan', label: 'Perjalanan' },
  { id: 'kendaraan', label: 'Kendaraan' },
  { id: 'pelanggan', label: 'Pelanggan' },
  { id: 'general', label: 'Umum' },
];

const ORDER_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);

type GalleryItem = {
  id: string;
  caption: string;
  image_url: string;
  category: string;
  location: string | null;
  display_order: number;
  is_active: boolean;
};

export default function GaleriEdit() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!id) {
      router.push('/admin/dashboard/galeri');
      return;
    }
    loadItem();
  }, [id]);

  const loadItem = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      if (!data) {
        router.push('/admin/dashboard/galeri');
        return;
      }
      setItem(data as GalleryItem);
      setImageUrl(data.image_url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const { error } = await supabase
        .from('gallery_items')
        .update({
          caption: item.caption,
          image_url: imageUrl || item.image_url,
          category: item.category,
          location: item.location,
          display_order: item.display_order,
          is_active: item.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
      if (error) throw error;
      setSuccess(true);
      setTimeout(() => router.push('/admin/dashboard/galeri'), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <AdminDashboardLayout title="Edit Galeri">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-3 border-accent border-t-transparent mx-auto" />
          <p className="text-muted text-sm mt-3">Memuat...</p>
        </div>
      </AdminDashboardLayout>
    );

  if (error && !item)
    return (
      <AdminDashboardLayout title="Edit Galeri">
        <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl m-6">
          {error}
        </div>
      </AdminDashboardLayout>
    );

  if (!item) return null;

  return (
    <AdminDashboardLayout
      eyebrow="Galeri"
      title={`Edit: ${item.caption}`}
      subtitle="Ubah detail foto galeri."
    >
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          {error && (
            <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-success/10 border border-success/30 text-success p-4 rounded-xl flex items-center gap-2">
              <Check size={16} /> Perubahan disimpan
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Foto
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
              value={item.caption}
              onChange={(e) => setItem({ ...item, caption: e.target.value })}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Kategori
              </label>
              <select
                value={item.category}
                onChange={(e) => setItem({ ...item, category: e.target.value })}
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
                value={item.location || ''}
                onChange={(e) => setItem({ ...item, location: e.target.value || null })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Urutan Tampil
            </label>
            <select
              value={item.display_order}
              onChange={(e) => setItem({ ...item, display_order: parseInt(e.target.value) || 99 })}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              {ORDER_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
              <option value={99}>99 — terakhir)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-line">
            <button
              type="button"
              onClick={() => setItem({ ...item, is_active: !item.is_active })}
              className="flex items-start gap-3 p-3 rounded-xl border border-line hover:bg-accent/5 hover:border-accent transition text-left w-full"
            >
              <div
                className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${
                  item.is_active ? 'bg-accent' : 'bg-line'
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                    item.is_active ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-heading">Tampilkan di Website</p>
                <p className="text-[11px] text-muted">Foto muncul di halaman galeri publik</p>
              </div>
            </button>
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
              disabled={saving}
              className="px-5 py-2.5 bg-accent text-white font-extrabold rounded-xl hover:bg-accent-hover disabled:opacity-50 shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] transition"
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </AdminDashboardLayout>
  );
}