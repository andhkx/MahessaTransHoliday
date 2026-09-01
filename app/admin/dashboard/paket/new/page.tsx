'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import { formatIDR } from '@/lib/format';
import AdminForm from '@/components/admin/AdminForm';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

const DESTINATIONS = ['Bandung', 'Garut', 'Jakarta', 'Yogyakarta', 'Bali', 'Pangalengan', 'Ciwidey', 'Pangandaran', 'Bromo', 'Semarang'] as const;
const INCLUDES = [
  'Mobil Toyota Hiace',
  'Driver Berpengalaman',
  'BBM',
  'Tol',
  'Parkir',
  'Retribusi Wisata',
  'Makan',
  'Tiket Penyeberangan',
  'Akomodasi Hotel',
] as const;
const SUITABLE_FOR = [
  'Wisata Keluarga',
  'Perjalanan Dinas',
  'City Tour',
  'Airport Transfer',
  'Wisata Alam',
  'School Trip',
  'Family Gathering',
  'Team Outing',
  'Charter',
] as const;
const EXCLUDED_OPTIONS = ['Tol', 'Parkir', 'Retribusi Wisata', 'Makan Driver', 'Overtime'];

export default function PaketCreate() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [destination, setDestination] = useState<'' | typeof DESTINATIONS[number]>('');
  const [duration_days, setDurationDays] = useState('');
  const [duration_text, setDurationText] = useState('');
  const [duration_hours, setDurationHours] = useState('');
  const [price, setPrice] = useState('');
  const [includes, setIncludes] = useState<string[]>(['Mobil Toyota Hiace', 'Driver Berpengalaman', 'BBM']);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [suitable_for, setSuitableFor] = useState<string[]>([]);
  const [cover_image_url, setCoverImageUrl] = useState<string | null>(null);
  const [badge, setBadge] = useState('');
  const [is_active, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from('packages').insert({
        name,
        slug,
        description: description ? [description] : [],
        destination,
        duration_days: parseInt(duration_days),
        duration_text: duration_text || `${duration_days} Hari`,
        duration_hours: parseInt(duration_hours) || parseInt(duration_days) * 10,
        price: parseInt(price),
        includes,
        excluded,
        suitable_for,
        cover_image_url,
        badge: badge || null,
        is_active,
      });

      if (error) throw error;

      router.push('/admin/dashboard/paket');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => router.push('/admin/dashboard/paket');

  return (
    <AdminDashboardLayout title="Tambah Paket Baru">
      <AdminForm
        title="Tambah Paket Perjalanan"
        description="Buat paket wisata baru yang akan ditampilkan di website."
        onSubmit={handleSave}
        onCancel={handleCancel}
        loading={loading}
        submitText="Simpan Paket"
      >
        {error && (
          <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Nama Paket *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);
                const generatedSlug = value
                  .toLowerCase()
                  .trim()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-');
                setSlug(generatedSlug);
              }}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="Paket Wisata Bandung 1 Hari"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="paket-wisata-bandung-1-hari"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Badge (Opsional - "Best Seller", "Premium", dll)
          </label>
          <input
            type="text"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
            placeholder="Best Seller"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Deskripsi Singkat
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
            placeholder="Deskripsi paket perjalanan..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Destinasi *
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value as typeof DESTINATIONS[number] | '')}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
              required
            >
              <option value="">Pilih destinasi</option>
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Durasi (Hari) *
            </label>
            <input
              type="number"
              value={duration_days}
              onChange={(e) => setDurationDays(e.target.value)}
              min={1}
              max={14}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="1"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Durasi (Jam) *
            </label>
            <input
              type="number"
              value={duration_hours}
              onChange={(e) => setDurationHours(e.target.value)}
              min={1}
              max={336}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="10"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Label Durasi (Opsional - "1 Hari", "2 Hari 1 Malam", dll)
          </label>
          <input
            type="text"
            value={duration_text}
            onChange={(e) => setDurationText(e.target.value)}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
            placeholder="1 Hari"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Harga (Rp) *
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
            placeholder="1300000"
            required
          />
          <p className="text-xs text-muted mt-1">Contoh: 1300000 = Rp1.300.000</p>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Termasuk
          </label>
          <div className="flex flex-wrap gap-2">
            {INCLUDES.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`include-${item}`}
                  checked={includes.includes(item)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setIncludes([...includes, item]);
                    } else {
                      setIncludes(includes.filter(i => i !== item));
                    }
                  }}
                  className="h-4 w-4 text-accent"
                />
                <label className="text-sm text-heading" htmlFor={`include-${item}`}>
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Tidak Termasuk
          </label>
          <div className="flex flex-wrap gap-2">
            {EXCLUDED_OPTIONS.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`exclude-${item}`}
                  checked={excluded.includes(item)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setExcluded([...excluded, item]);
                    } else {
                      setExcluded(excluded.filter(i => i !== item));
                    }
                  }}
                  className="h-4 w-4 text-accent"
                />
                <label className="text-sm text-heading" htmlFor={`exclude-${item}`}>
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Cocok Untuk
          </label>
          <div className="flex flex-wrap gap-2">
            {SUITABLE_FOR.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`suitable-${item}`}
                  checked={suitable_for.includes(item)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSuitableFor([...suitable_for, item]);
                    } else {
                      setSuitableFor(suitable_for.filter(i => i !== item));
                    }
                  }}
                  className="h-4 w-4 text-accent"
                />
                <label className="text-sm text-heading" htmlFor={`suitable-${item}`}>
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Cover Gambar
          </label>
          <ImageUpload
            bucket="packages"
            onUpload={(url) => setCoverImageUrl(url)}
            currentUrl={cover_image_url}
            label="Cover Paket"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Status Aktif
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={is_active}
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