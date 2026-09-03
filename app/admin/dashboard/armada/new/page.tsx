'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import AdminForm from '@/components/admin/AdminForm';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

const CATEGORIES = ['entry', 'midrange', 'premium', 'luxury', 'group'] as const;
const TRANSMISSIONS = ['Automatic', 'Manual', 'Automatic CVT'] as const;
const FUEL_TYPES = ['Bensin', 'Diesel', 'Bensin Hybrid'] as const;
const FEATURES = [
  'AC Dingin',
  'Audio System',
  'Power Steering',
  'Kursi Nyaman',
  'Window/Kaca Tinted',
  'Fitur Keselamatan Lengkap',
  'AC Double Blower',
  'AC Dual Zone',
  'Captain Seat Premium',
  'Audio & Video System',
  'Power Sliding Door',
  'Kabin Senyap',
  'Reclining Seat',
  'Bagasi Luas',
  'Bagasi Kapasitas Besar',
  'Bagasi Sangat luas',
  'Kabin Tinggi',
  'Ground Clearance Tinggi',
  'Sunroof',
] as const;

const categoryLabels: Record<string, string> = {
  entry: 'City Car (Ekonomis)',
  midrange: 'MPV (Standar)',
  premium: 'SUV & Premium',
  luxury: 'Luxury',
  group: 'Group / Rombongan',
};

export default function ArmadaCreate() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'entry' | 'midrange' | 'premium' | 'luxury' | 'group'>('entry');
  const [transmission, setTransmission] = useState<'Automatic' | 'Manual' | 'Automatic CVT'>('Automatic');
  const [fuel_type, setFuelType] = useState<'Bensin' | 'Diesel' | 'Bensin Hybrid'>('Bensin');
  const [price_per_day, setPricePerDay] = useState('');
  const [capacity, setCapacity] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [badge, setBadge] = useState('');
  const [is_active, setIsActive] = useState(true);
  const [is_featured, setIsFeatured] = useState(false);
  const [gallery, setGallery] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from('vehicles').insert({
        name,
        slug,
        category,
        transmission,
        fuel_type,
        price_per_day: parseInt(price_per_day),
        capacity: parseInt(capacity),
        features,
        badge: badge || null,
        image_url: previewUrl,
        gallery,
        is_active,
        is_featured,
      });

      if (error) throw error;

      router.push('/admin/dashboard/armada');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/dashboard/armada');
  };

  return (
    <AdminDashboardLayout title="Tambah Armada Baru">
      <AdminForm
        title="Tambah Armada Baru"
        description="Isi formulir di bawah untuk menambahkan armada baru ke website."
        onSubmit={handleSave}
        onCancel={handleCancel}
        loading={loading}
        submitText="Simpan Armada"
      >
        {error && (
          <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Nama Armada *
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
              placeholder="Toyota Avanza"
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
              placeholder="toyota-avanza"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Badge (Opsional - "Populer", "Best Seller", "Luxury", dll)
          </label>
          <input
            type="text"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
            placeholder="Populer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Kategori *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as 'entry' | 'midrange' | 'premium' | 'luxury' | 'group')}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Transmisi *
            </label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value as 'Automatic' | 'Manual' | 'Automatic CVT')}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              {TRANSMISSIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Tipe Bahan Bakar *
            </label>
            <select
              value={fuel_type}
              onChange={(e) => setFuelType(e.target.value as 'Bensin' | 'Diesel' | 'Bensin Hybrid')}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Kapasitas Penumpang *
            </label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              min={1}
              max={20}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="7"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Harga per 12 Jam (Rp) *
          </label>
          <input
            type="number"
            value={price_per_day}
            onChange={(e) => setPricePerDay(e.target.value)}
            min={0}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
            placeholder="350000"
            required
          />
          <p className="text-xs text-muted mt-1">Contoh: 350000 = Rp350.000</p>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Fitur
          </label>
          <div className="flex flex-wrap gap-2">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`feature-${feature}`}
                  checked={features.includes(feature)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFeatures([...features, feature]);
                    } else {
                      setFeatures(features.filter(f => f !== feature));
                    }
                  }}
                  className="h-4 w-4 text-accent"
                />
                <label
                  className="text-sm text-heading"
                  htmlFor={`feature-${feature}`}
                >
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Gambar Utama Armada
          </label>
          <ImageUpload
            bucket="vehicles"
            onUpload={(url) => setPreviewUrl(url || null)}
            currentUrl={previewUrl}
            label="Gambar Utama Armada"
          />
        </div>

        <MultiImageUpload
          bucket="vehicles"
          images={gallery}
          onChange={setGallery}
          label="Foto Interior & Detail"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-line">
          <ToggleField
            label="Tampilkan di Website"
            description="Armada muncul di halaman publik /armada"
            checked={is_active}
            onChange={setIsActive}
          />
          <ToggleField
            label="Tampilkan di Beranda"
            description="Armada muncul di section utama homepage"
            checked={is_featured}
            onChange={setIsFeatured}
          />
        </div>
      </AdminForm>
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