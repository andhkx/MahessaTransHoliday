'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

const DESTINATIONS = [
  'Bandung',
  'Garut',
  'Jakarta',
  'Yogyakarta',
  'Bali',
  'Pangalengan',
  'Ciwidey',
  'Pangandaran',
  'Bromo',
  'Semarang',
];

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
];

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
];

const EXCLUDED_OPTIONS = ['Tol', 'Parkir', 'Retribusi Wisata', 'Makan Driver', 'Overtime'];

export default function PaketCreate() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [destination, setDestination] = useState('');
  const [duration_days, setDurationDays] = useState('');
  const [duration_text, setDurationText] = useState('');
  const [duration_hours, setDurationHours] = useState('');
  const [price, setPrice] = useState('');
  const [includes, setIncludes] = useState<string[]>([
    'Mobil Toyota Hiace',
    'Driver Berpengalaman',
    'BBM',
  ]);
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
    if (!name || !slug || !destination || !duration_days || !price) {
      setError('Lengkapi field wajib (nama, slug, destinasi, hari, harga).');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const descArr = description
        .split(/\n\n+/)
        .map((s) => s.trim())
        .filter(Boolean);
      const { error } = await supabase.from('packages').insert({
        name,
        slug,
        description: descArr,
        destination,
        duration_days: parseInt(duration_days),
        duration_text: duration_text || `${duration_days} Hari`,
        duration_hours: duration_hours
          ? parseInt(duration_hours)
          : parseInt(duration_days) * 10,
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

  return (
    <AdminDashboardLayout
      eyebrow="Paket"
      title="Tambah Paket Baru"
      subtitle="Buat paket wisata baru untuk ditampilkan di website."
    >
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6 max-w-4xl">
        <form onSubmit={handleSave} className="space-y-6">
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
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="Paket Wisata Bandung 1 Hari"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="paket-wisata-bandung-1-hari"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Badge (Opsional)
            </label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="Best Seller"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Deskripsi (pisah paragraf dengan baris kosong)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
              placeholder="Paragraf pertama...&#10;&#10;Paragraf kedua..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Destinasi *
              </label>
              <input
                list="destinations-new"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="Pilih atau ketik baru"
                required
              />
              <datalist id="destinations-new">
                {DESTINATIONS.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
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
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="1"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Durasi (Jam)
              </label>
              <input
                type="number"
                value={duration_hours}
                onChange={(e) => setDurationHours(e.target.value)}
                min={1}
                max={336}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Label Durasi (Opsional)
            </label>
            <input
              type="text"
              value={duration_text}
              onChange={(e) => setDurationText(e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
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
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="1300000"
              required
            />
          </div>

          <CheckboxSection label="Termasuk" options={INCLUDES} value={includes} onChange={setIncludes} />
          <CheckboxSection label="Tidak Termasuk" options={EXCLUDED_OPTIONS} value={excluded} onChange={setExcluded} />
          <CheckboxSection label="Cocok Untuk" options={SUITABLE_FOR} value={suitable_for} onChange={setSuitableFor} />

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Cover Gambar
            </label>
            <ImageUpload
              bucket="packages"
              onUpload={(url) => setCoverImageUrl(url || null)}
              currentUrl={cover_image_url}
              label="Cover Paket"
            />
          </div>

          <div className="pt-4 border-t border-line">
            <ToggleField
              label="Tampilkan di Website & Beranda"
              description="Paket muncul di halaman publik dan section utama"
              checked={is_active}
              onChange={setIsActive}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard/paket')}
              className="px-5 py-2.5 border border-line rounded-xl text-sm font-medium text-heading hover:bg-surface/50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-accent text-white font-extrabold rounded-xl hover:bg-accent-hover disabled:opacity-50 shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] transition"
            >
              {loading ? 'Menyimpan...' : 'Simpan Paket'}
            </button>
          </div>
        </form>
      </div>
    </AdminDashboardLayout>
  );
}

function CheckboxSection({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((item) => {
          const checked = value.includes(item);
          return (
            <label
              key={item}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border cursor-pointer transition select-none ${
                checked
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-heading border-line hover:border-accent'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) =>
                  onChange(e.target.checked ? [...value, item] : value.filter((i) => i !== item))
                }
                className="sr-only"
              />
              <span className="text-xs font-bold">{item}</span>
            </label>
          );
        })}
      </div>
    </div>
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
      className="flex items-start gap-3 p-3 rounded-xl border border-line hover:bg-accent/5 hover:border-accent transition text-left"
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