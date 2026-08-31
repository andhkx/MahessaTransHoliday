'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import { formatIDR } from '@/lib/format';
import { X, Check, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

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
  is_active: boolean;
};

const CATEGORIES = ['entry', 'midrange', 'premium', 'luxury', 'group'] as const;
const TRANSMISSIONS = ['Automatic', 'Manual'] as const;
const FUEL_TYPES = ['Bensin', 'Diesel'] as const;
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
  const pathname = usePathname();

  useEffect(() => {
    if (!vehicleId) {
      router.push('/admin/dashboard/armada');
      return;
    }
    loadVehicle();
  }, [vehicleId]);

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const updates: Partial<Vehicle> = {
        name,
        slug,
        category,
        transmission,
        fuel_type,
        price_per_day,
        capacity,
        features,
        image_url: previewUrl || vehicle.image_url,
        is_active,
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/dashboard/armada');
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-error">{error}</div>;
  if (!vehicle) return <div className="p-8 text-center">Armada tidak ditemukan.</div>;

  const {
    name,
    slug,
    category,
    transmission,
    fuel_type,
    price_per_day,
    capacity,
    is_active,
  } = vehicle;

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white shadow-sm border-b border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard/armada" className="flex items-center gap-3">
            <X size={20} className="text-muted" />
            <span className="text-sm font-medium text-heading">Armada</span>
          </Link>
          <h1 className="text-xl font-extrabold text-heading">Edit Armada</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div className="bg-white rounded-[24px] border border-line shadow-card p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                  Nama Armada *
                </label>
                <input
                  type="text"
                  value={name || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setVehicle(v => v ? { ...v!, name: value } : null);
                    const generatedSlug = value
                      .toLowerCase()
                      .trim()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-');
                    setVehicle(v => v ? { ...v!, slug: generatedSlug } : null);
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
                  value={slug || ''}
                  onChange={(e) => setVehicle(v => v ? { ...v!, slug: e.target.value } : null)}
                  className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
                  placeholder="toyota-avanza"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                  Kategori
                </label>
                <select
                  value={category || 'entry'}
                  onChange={(e) => setVehicle(v => v ? { ...v!, category: e.target.value as 'entry' | 'midrange' | 'premium' | 'luxury' | 'group' } : null)}
                  className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'entry' ? 'City Car' : cat === 'midrange' ? 'MPV' : cat === 'premium' ? 'SUV & Premium' : cat === 'luxury' ? 'Luxury' : 'Group'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                  Transmisi
                </label>
                <select
                  value={transmission || 'Automatic'}
                  onChange={(e) => setVehicle(v => v ? { ...v!, transmission: e.target.value as 'Automatic' | 'Manual' } : null)}
                  className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
                >
                  {TRANSMISSIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                  Tipe Bahan Bakar
                </label>
                <select
                  value={fuel_type || 'Bensin'}
                  onChange={(e) => setVehicle(v => v ? { ...v!, fuel_type: e.target.value as 'Bensin' | 'Diesel' } : null)}
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
                  value={capacity || 0}
                  min={1}
                  max={20}
                  onChange={(e) => setVehicle(v => v ? { ...v!, capacity: parseInt(e.target.value) || 0 } : null)}
                  className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
                  placeholder="7"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Harga per Hari (Rp)
              </label>
              <input
                type="number"
                value={price_per_day || 0}
                min={0}
                onChange={(e) => setVehicle(v => v ? { ...v!, price_per_day: parseInt(e.target.value) || 0 } : null)}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="350000"
                required
              />
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
                  checked={is_active}
                  onChange={(e) => setVehicle(v => v ? { ...v!, is_active: e.target.checked } : null)}
                  className="h-4 w-4 text-accent"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 border border-line rounded-xl text-sm font-medium text-heading hover:bg-surface/50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-accent text-white font-extrabold rounded-xl hover:bg-accent-hover transition disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}