'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import ImageUpload from '@/components/admin/ImageUpload';
import { Check, Loader2 } from 'lucide-react';
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

type Package = {
  id: string;
  name: string;
  slug: string;
  description: string[] | null;
  destination: string;
  duration_days: number;
  duration_text: string | null;
  duration_hours: number | null;
  price: number;
  includes: string[] | null;
  excluded: string[] | null;
  suitable_for: string[] | null;
  cover_image_url: string | null;
  badge: string | null;
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
  const [success, setSuccess] = useState(false);
  const [includes, setIncludes] = useState<string[]>([]);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [suitableFor, setSuitableFor] = useState<string[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const supabase = createClient();

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
      setExcluded(data.excluded || []);
      setSuitableFor(data.suitable_for || []);
      setCoverImageUrl(data.cover_image_url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      router.push('/admin/dashboard/paket');
      return;
    }
    loadPaket();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkg) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const { error } = await supabase
        .from('packages')
        .update({
          name: pkg.name,
          slug: pkg.slug,
          description: pkg.description,
          destination: pkg.destination,
          duration_days: pkg.duration_days,
          duration_text: pkg.duration_text,
          duration_hours: pkg.duration_hours,
          price: pkg.price,
          includes,
          excluded,
          suitable_for: suitableFor,
          cover_image_url: coverImageUrl,
          badge: pkg.badge,
          is_active: pkg.is_active,
        })
        .eq('id', id);
      if (error) throw error;
      setSuccess(true);
      setTimeout(() => router.push('/admin/dashboard/paket'), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-muted">Loading...</div>;
  if (error) return <div className="p-8 text-center text-error">{error}</div>;
  if (!pkg) return null;

  return (
    <AdminDashboardLayout title={`Edit: ${pkg.name}`}>
      <div className="bg-white rounded-[18px] border border-line shadow-card p-6 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          {error && (
            <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-success/10 border border-success/30 text-success p-4 rounded-xl flex items-center gap-2">
              <Check size={16} /> Perubahan disimpan
            </div>
          )}

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
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Badge</label>
            <input
              type="text"
              value={pkg.badge || ''}
              onChange={(e) => setPkg({ ...pkg, badge: e.target.value || null })}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="Best Seller"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Deskripsi</label>
            <textarea
              value={(pkg.description || []).join('\n\n')}
              onChange={(e) => setPkg({ ...pkg, description: e.target.value ? [e.target.value] : [] })}
              rows={4}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Hari</label>
              <input
                type="number"
                value={pkg.duration_days}
                onChange={(e) => setPkg({ ...pkg, duration_days: parseInt(e.target.value) || 1 })}
                min={1}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Jam</label>
              <input
                type="number"
                value={pkg.duration_hours || ''}
                onChange={(e) => setPkg({ ...pkg, duration_hours: parseInt(e.target.value) || null })}
                min={1}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Label</label>
              <input
                type="text"
                value={pkg.duration_text || ''}
                onChange={(e) => setPkg({ ...pkg, duration_text: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="1 Hari"
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
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Tidak Termasuk</label>
            <div className="flex flex-wrap gap-2">
              {EXCLUDED_OPTIONS.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`exc-${item}`}
                    checked={excluded.includes(item)}
                    onChange={(e) => {
                      if (e.target.checked) setExcluded([...excluded, item]);
                      else setExcluded(excluded.filter((i) => i !== item));
                    }}
                    className="h-4 w-4 text-accent"
                  />
                  <label className="text-sm text-heading" htmlFor={`exc-${item}`}>{item}</label>
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
            <span className="text-sm text-heading">Tampilkan di website</span>
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