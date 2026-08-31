'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import ImageUpload from '@/components/admin/ImageUpload';
import { X, Loader2 } from 'lucide-react';

const DESTINATIONS = ['Bandung', 'Garut', 'Jakarta', 'Yogyakarta', 'Bali'] as const;
const INCLUDES = [
  'Mobil', 'Driver Berpengalaman', 'BBM', 'Tol', 'Parkir',
  'Retribusi Wisata', 'Makan', 'Tiket Penyeberangan', 'Akomodasi Hotel',
] as const;
const SUITABLE_FOR = [
  'Wisata Keluarga', 'Perjalanan Dinas', 'City Tour', 'Airport Transfer',
  'Wisata Alam', 'School Trip', 'Family Gathering', 'Team Outing', 'Charter',
] as const;

type Package = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  destination: string;
  duration_days: number;
  price: number;
  includes: string[] | null;
  suitable_for: string[] | null;
  cover_image_url: string | null;
  is_active: boolean;
};

export default function PaketEdit() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [includes, setIncludes] = useState<string[]>([]);
  const [suitableFor, setSuitableFor] = useState<string[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!id) {
      router.push('/admin/dashboard/paket');
      return;
    }
    loadPaket();
  }, [id]);

  const loadPaket = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('packages').select('*').eq('id', id).single();
      if (error) throw error;
      if (!data) {
        router.push('/admin/dashboard/paket');
        return;
      }
      setPkg(data);
      setIncludes(data.includes || []);
      setSuitableFor(data.suitable_for || []);
      setCoverImageUrl(data.cover_image_url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkg) return;
    setSaving(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('packages')
        .update({
          name: pkg.name,
          slug: pkg.slug,
          description: pkg.description,
          destination: pkg.destination,
          duration_days: pkg.duration_days,
          price: pkg.price,
          includes,
          suitable_for: suitableFor,
          cover_image_url: coverImageUrl,
          is_active: pkg.is_active,
        })
        .eq('id', id);
      if (error) throw error;
      router.push('/admin/dashboard/paket');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-error">{error}</div>;
  if (!pkg) return null;

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white shadow-sm border-b border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard/paket" className="flex items-center gap-3">
            <X size={20} className="text-muted" />
            <span className="text-sm font-medium text-heading">Paket</span>
          </Link>
          <h1 className="text-xl font-extrabold text-heading">Edit Paket</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <form onSubmit={handleSave} className="bg-white rounded-[24px] border border-line shadow-card p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Nama Paket *</label>
              <input
                type="text"
                value={pkg.name}
                onChange={(e) => setPkg({ ...pkg, name: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Slug</label>
              <input
                type="text"
                value={pkg.slug}
                onChange={(e) => setPkg({ ...pkg, slug: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Deskripsi</label>
            <textarea
              value={pkg.description || ''}
              onChange={(e) => setPkg({ ...pkg, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Destinasi</label>
              <select
                value={pkg.destination}
                onChange={(e) => setPkg({ ...pkg, destination: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                {DESTINATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Durasi (hari)</label>
              <input
                type="number"
                value={pkg.duration_days}
                onChange={(e) => setPkg({ ...pkg, duration_days: parseInt(e.target.value) || 1 })}
                min={1}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Harga (Rp)</label>
            <input
              type="number"
              value={pkg.price}
              onChange={(e) => setPkg({ ...pkg, price: parseInt(e.target.value) || 0 })}
              min={0}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Termasuk</label>
            <div className="flex flex-wrap gap-2">
              {INCLUDES.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`inc-${item}`}
                    checked={includes.includes(item)}
                    onChange={(e) => {
                      if (e.target.checked) setIncludes([...includes, item]);
                      else setIncludes(includes.filter((i) => i !== item));
                    }}
                    className="h-4 w-4 text-accent"
                  />
                  <label className="text-sm text-heading" htmlFor={`inc-${item}`}>{item}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Cocok Untuk</label>
            <div className="flex flex-wrap gap-2">
              {SUITABLE_FOR.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`suit-${item}`}
                    checked={suitableFor.includes(item)}
                    onChange={(e) => {
                      if (e.target.checked) setSuitableFor([...suitableFor, item]);
                      else setSuitableFor(suitableFor.filter((i) => i !== item));
                    }}
                    className="h-4 w-4 text-accent"
                  />
                  <label className="text-sm text-heading" htmlFor={`suit-${item}`}>{item}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Cover</label>
            <ImageUpload bucket="packages" onUpload={setCoverImageUrl} currentUrl={coverImageUrl} label="Cover Paket" />
          </div>

          <div className="flex items-center gap-3">
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Aktif</label>
            <input
              type="checkbox"
              checked={pkg.is_active}
              onChange={(e) => setPkg({ ...pkg, is_active: e.target.checked })}
              className="h-4 w-4 text-accent"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard/paket')}
              className="px-5 py-2.5 border border-line rounded-xl text-sm font-medium text-heading hover:bg-surface/50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-accent text-white font-extrabold rounded-xl hover:bg-accent-hover disabled:opacity-50"
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}