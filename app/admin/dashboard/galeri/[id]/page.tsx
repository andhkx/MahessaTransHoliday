'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ImageUpload from '@/components/admin/ImageUpload';
import { Check } from 'lucide-react';
import AdminForm from '@/components/admin/AdminForm';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

const CATEGORIES = [
  { id: 'perjalanan', label: 'Perjalanan' },
  { id: 'kendaraan', label: 'Kendaraan' },
  { id: 'pelanggan', label: 'Pelanggan' },
  { id: 'general', label: 'Umum' },
];

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

  const loadItem = async () => {
    setLoading(true);
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
      setItem(data);
      setImageUrl(data.image_url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      router.push('/admin/dashboard/galeri');
      return;
    }
    loadItem();
  }, [id]);

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

  if (loading) return <AdminDashboardLayout title="Edit Galeri"><div className="p-8 text-center text-muted">Loading...</div></AdminDashboardLayout>;
  if (error) return <AdminDashboardLayout title="Edit Galeri"><div className="p-8 text-center text-error">{error}</div></AdminDashboardLayout>;
  if (!item) return null;

  return (
    <AdminDashboardLayout title="Edit Foto Galeri">
      <AdminForm
        title="Edit Foto Galeri"
        description="Ubah detail foto galeri."
        onSubmit={handleSave}
        onCancel={() => router.push('/admin/dashboard/galeri')}
        loading={saving}
        submitText="Simpan Perubahan"
      >
        {error && (
          <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">{error}</div>
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
            onUpload={(url) => setImageUrl(url)}
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
                <option key={c.id} value={c.id}>{c.label}</option>
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
            Urutan
          </label>
          <input
            type="number"
            value={item.display_order}
            onChange={(e) => setItem({ ...item, display_order: parseInt(e.target.value) || 99 })}
            min={1}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Status Aktif
          </label>
          <input
            type="checkbox"
            checked={item.is_active}
            onChange={(e) => setItem({ ...item, is_active: e.target.checked })}
            className="h-4 w-4 text-accent"
          />
          <span className="text-sm text-heading">Tampilkan di website</span>
        </div>
      </AdminForm>
    </AdminDashboardLayout>
  );
}