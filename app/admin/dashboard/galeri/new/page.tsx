'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import AdminForm from '@/components/admin/AdminForm';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

const CATEGORIES = [
  { id: 'perjalanan', label: 'Perjalanan' },
  { id: 'kendaraan', label: 'Kendaraan' },
  { id: 'pelanggan', label: 'Pelanggan' },
  { id: 'general', label: 'Umum' },
];

export default function GaleriCreate() {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [category, setCategory] = useState('perjalanan');
  const [location, setLocation] = useState('');
  const [displayOrder, setDisplayOrder] = useState('99');
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
        display_order: parseInt(displayOrder) || 99,
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

  const handleCancel = () => router.push('/admin/dashboard/galeri');

  return (
    <AdminDashboardLayout title="Upload Galeri">
      <AdminForm
        title="Upload Foto Galeri"
        description="Tambahkan foto dokumentasi perjalanan, kendaraan, atau aktivitas."
        onSubmit={handleSave}
        onCancel={handleCancel}
        loading={loading}
        submitText="Upload Galeri"
      >
        {error && (
          <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">{error}</div>
        )}

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Foto *
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
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Lokasi (opsional)
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
          <input
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(e.target.value)}
            min={1}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
          <p className="text-xs text-muted mt-1">Angka lebih kecil tampil lebih dulu</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Status Aktif
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 text-accent"
            />
            <span className="text-sm text-heading">Tampilkan di website</span>
          </div>
        </div>
      </AdminForm>
    </AdminDashboardLayout>
  );
}