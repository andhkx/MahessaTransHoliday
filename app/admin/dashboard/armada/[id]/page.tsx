'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import { Check } from 'lucide-react';
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

type Vehicle = {
  id: string;
  name: string;
  slug: string;
  category: string;
  transmission: string;
  fuel_type: string;
  price_per_day: number;
  capacity: number;
  features: string[] | null;
  image_url: string | null;
  gallery: string[] | null;
  badge: string | null;
  is_active: boolean;
  is_featured: boolean;
};

const toStringArray = (v: unknown): string[] => {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === 'string');
  if (typeof v === 'string' && v.trim()) {
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === 'string');
    } catch {}
    return [v];
  }
  return [];
};

export default function ArmadaEdit() {
  const params = useParams<{ id: string }>();
  const vehicleId = params.id;
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const supabase = createClient();

  useEffect(() => {
    if (!vehicleId) {
      router.push('/admin/dashboard/armada');
      return;
    }
    loadVehicle();
  }, [vehicleId]);

  const loadVehicle = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', vehicleId)
        .single();
      if (error) throw error;
      if (!data) {
        router.push('/admin/dashboard/armada');
        return;
      }
      const v = data as Vehicle;
      setVehicle(v);
      setFeatures(toStringArray(v.features));
      setPreviewUrl(v.image_url);
      setGallery(toStringArray(v.gallery));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({
          name: vehicle.name,
          slug: vehicle.slug,
          category: vehicle.category,
          transmission: vehicle.transmission,
          fuel_type: vehicle.fuel_type,
          price_per_day: vehicle.price_per_day,
          capacity: vehicle.capacity,
          features,
          badge: vehicle.badge,
          image_url: previewUrl || vehicle.image_url,
          gallery,
          is_active: vehicle.is_active,
          is_featured: vehicle.is_featured,
          updated_at: new Date().toISOString(),
        })
        .eq('id', vehicleId);
      if (error) throw error;
      setSuccess(true);
      setTimeout(() => router.push('/admin/dashboard/armada'), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <AdminDashboardLayout title="Edit Armada">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-3 border-accent border-t-transparent mx-auto" />
          <p className="text-muted text-sm mt-3">Memuat...</p>
        </div>
      </AdminDashboardLayout>
    );

  if (error && !vehicle)
    return (
      <AdminDashboardLayout title="Edit Armada">
        <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl m-6">
          {error}
        </div>
      </AdminDashboardLayout>
    );

  if (!vehicle) return null;

  return (
    <AdminDashboardLayout
      eyebrow="Armada"
      title={`Edit: ${vehicle.name}`}
      subtitle="Ubah data armada. Perubahan langsung tampil di website."
    >
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6 max-w-4xl">
        <form onSubmit={handleSave} className="space-y-6">
          {error && (
            <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-success/10 border border-success/30 text-success p-4 rounded-xl flex items-center gap-2">
              <Check size={16} /> Perubahan disimpan — mengarahkan ke daftar armada...
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Nama Armada *
              </label>
              <input
                type="text"
                value={vehicle.name}
                onChange={(e) => setVehicle({ ...vehicle, name: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={vehicle.slug}
                onChange={(e) => setVehicle({ ...vehicle, slug: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Badge
            </label>
            <input
              type="text"
              value={vehicle.badge || ''}
              onChange={(e) =>
                setVehicle({ ...vehicle, badge: e.target.value || null })
              }
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="Populer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Kategori *
              </label>
              <select
                value={vehicle.category}
                onChange={(e) => setVehicle({ ...vehicle, category: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
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
                value={vehicle.transmission}
                onChange={(e) => setVehicle({ ...vehicle, transmission: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                {TRANSMISSIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Bahan Bakar *
              </label>
              <select
                value={vehicle.fuel_type}
                onChange={(e) => setVehicle({ ...vehicle, fuel_type: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                {FUEL_TYPES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Kapasitas *
              </label>
              <input
                type="number"
                value={vehicle.capacity}
                min={1}
                max={20}
                onChange={(e) =>
                  setVehicle({ ...vehicle, capacity: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
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
              value={vehicle.price_per_day}
              min={0}
              onChange={(e) =>
                setVehicle({ ...vehicle, price_per_day: parseInt(e.target.value) || 0 })
              }
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Fitur
            </label>
            <div className="flex flex-wrap gap-2">
              {FEATURES.map((feature) => (
                <FeatureChip
                  key={feature}
                  label={feature}
                  checked={features.includes(feature)}
                  onChange={(c) =>
                    setFeatures(c ? [...features, feature] : features.filter((f) => f !== feature))
                  }
                />
              ))}
            </div>
          </div>

          <div>
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
              description="Armada muncul di halaman /armada"
              checked={vehicle.is_active}
              onChange={(c) => setVehicle({ ...vehicle, is_active: c })}
            />
            <ToggleField
              label="Tampilkan di Beranda"
              description="Armada muncul di section utama homepage"
              checked={vehicle.is_featured}
              onChange={(c) => setVehicle({ ...vehicle, is_featured: c })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard/armada')}
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

function FeatureChip({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (c: boolean) => void;
}) {
  return (
    <label
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border cursor-pointer transition select-none ${
        checked
          ? 'bg-accent text-white border-accent'
          : 'bg-white text-heading border-line hover:border-accent'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className="text-xs font-bold">{label}</span>
    </label>
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