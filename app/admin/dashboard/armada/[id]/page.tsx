'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import { formatIDR } from '@/lib/format';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
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

type Vehicle = {
  id: string;
  name: string;
  slug: string;
  category: string;
  transmission: string;
  fuel_type: string;
  price_per_day: number;
  capacity: number;
  features: string[];
  image_url: string | null;
  badge: string | null;
  is_active: boolean;
};

export default function ArmadaEdit() {
  const params = useParams<{ id: string }>();
  const vehicleId = params.id;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const loadVehicle = async () => {
    setLoading(true);
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
      setVehicle(data);
      setFeatures(data.features || []);
      setPreviewUrl(data.image_url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!vehicleId) {
      router.push('/admin/dashboard/armada');
      return;
    }
    loadVehicle();
  }, [vehicleId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const updates: Partial<Vehicle> = {
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
        is_active: vehicle.is_active,
      };

      const { error } = await supabase
        .from('vehicles')
        .update(updates)
        .eq('id', vehicleId);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard/armada');
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/dashboard/armada');
  };

  if (loading) return <AdminDashboardLayout title="Edit Armada"><div className="p-8 text-center text-muted">Loading...</div></AdminDashboardLayout>;
  if (error) return <AdminDashboardLayout title="Edit Armada"><div className="p-8 text-center text-error">{error}</div></AdminDashboardLayout>;
  if (!vehicle) return <AdminDashboardLayout title="Edit Armada"><div className="p-8 text-center text-muted">Armada tidak ditemukan.</div></AdminDashboardLayout>;

  return (
    <AdminDashboardLayout title={`Edit: ${vehicle.name}`}>
      <AdminForm
        title="Edit Armada"
        description="Ubah data armada. Perubahan akan langsung tampil di website."
        onSubmit={handleSave}
        onCancel={handleCancel}
        loading={loading}
        submitText="Simpan Perubahan"
      >
        {success && (
          <div className="bg-success/10 border border-success/30 text-success p-4 rounded-xl flex items-center gap-2">
            <Check size={16} /> Perubahan disimpan — mengarahkan ke daftar armada...
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Nama Armada *
            </label>
            <input
              type="text"
              value={vehicle.name || ''}
              onChange={(e) => {
                const value = e.target.value;
                setVehicle(v => v ? { ...v, name: value } : null);
                const generatedSlug = value
                  .toLowerCase()
                  .trim()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-');
                setVehicle(v => v ? { ...v, slug: generatedSlug } : null);
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
              value={vehicle.slug || ''}
              onChange={(e) => setVehicle(v => v ? { ...v, slug: e.target.value } : null)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="toyota-avanza"
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
            value={vehicle.badge || ''}
            onChange={(e) => setVehicle(v => v ? { ...v, badge: e.target.value || null } : null)}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
            placeholder="Populer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Kategori
            </label>
            <select
              value={vehicle.category || 'entry'}
              onChange={(e) => setVehicle(v => v ? { ...v, category: e.target.value as 'entry' | 'midrange' | 'premium' | 'luxury' | 'group' } : null)}
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
              Transmisi
            </label>
            <select
              value={vehicle.transmission || 'Automatic'}
              onChange={(e) => setVehicle(v => v ? { ...v, transmission: e.target.value as 'Automatic' | 'Manual' | 'Automatic CVT' } : null)}
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
              Tipe Bahan Bakar
            </label>
            <select
              value={vehicle.fuel_type || 'Bensin'}
              onChange={(e) => setVehicle(v => v ? { ...v, fuel_type: e.target.value as 'Bensin' | 'Diesel' | 'Bensin Hybrid' } : null)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Kapasitas Penumpang
            </label>
            <input
              type="number"
              value={vehicle.capacity || 0}
              min={1}
              max={20}
              onChange={(e) => setVehicle(v => v ? { ...v, capacity: parseInt(e.target.value) || 0 } : null)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="7"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Harga per 12 Jam (Rp)
          </label>
          <input
            type="number"
            value={vehicle.price_per_day || 0}
            min={0}
            onChange={(e) => setVehicle(v => v ? { ...v, price_per_day: parseInt(e.target.value) || 0 } : null)}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
            placeholder="350000"
            required
          />
          <p className="text-xs text-muted mt-1">{formatIDR(vehicle.price_per_day)} / 12 jam</p>
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
                      setFeatures(features.filter((f) => f !== feature));
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
            Gambar
          </label>
          <ImageUpload
            bucket="vehicles"
            onUpload={(url) => setPreviewUrl(url)}
            currentUrl={previewUrl}
            label="Gambar Armada"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Status Aktif
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={vehicle.is_active}
              onChange={(e) => setVehicle(v => v ? { ...v, is_active: e.target.checked } : null)}
              className="h-4 w-4 text-accent"
            />
            <span className="text-sm text-heading">Tampilkan di website</span>
          </div>
        </div>
      </AdminForm>
    </AdminDashboardLayout>
  );
}