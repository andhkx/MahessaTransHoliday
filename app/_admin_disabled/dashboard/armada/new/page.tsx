'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import { formatIDR } from '@/lib/format';
import { X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

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

export default function ArmadaCreate() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'entry' | 'midrange' | 'premium' | 'luxury' | 'group'>('entry');
  const [transmission, setTransmission] = useState<'Automatic' | 'Manual'>('Automatic');
  const [fuel_type, setFuelType] = useState<'Bensin' | 'Diesel'>('Bensin');
  const [price_per_day, setPricePerDay] = useState('');
  const [capacity, setCapacity] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
      const { error } = await supabase.from('vehicles').insert({
        name,
        slug,
        category,
        transmission,
        fuel_type,
        price_per_day: parseInt(price_per_day),
        capacity: parseInt(capacity),
        features,
        image_url: previewUrl,
        is_active,
      });

      if (error) throw error;

      router.push('/admin/dashboard/armada');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/dashboard/armada');
  };

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white shadow-sm border-b border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard/armada" className="flex items-center gap-3">
            <X size={20} className="text-muted" />
            <span className="text-sm font-medium text-heading">Armada</span>
          </Link>
          <h1 className="text-xl font-extrabold text-heading">Tambah Armada Baru</h1>
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
                  value={name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setName(value);
                    // Auto-generate slug
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as 'entry' | 'midrange' | 'premium' | 'luxury' | 'group')}
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
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value as 'Automatic' | 'Manual')}
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
                  value={fuel_type}
                  onChange={(e) => setFuelType(e.target.value as 'Bensin' | 'Diesel')}
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
                Harga per Hari (Rp)
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
                  onChange={(e) => setIsActive(e.target.checked)}
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
                {loading ? 'Menyimpan...' : 'Simpan Armada'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}