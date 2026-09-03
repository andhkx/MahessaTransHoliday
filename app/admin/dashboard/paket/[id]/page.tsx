'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import ImageUpload from '@/components/admin/ImageUpload';
import { Check } from 'lucide-react';
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

  useEffect(() => {
    if (!id) {
      router.push('/admin/dashboard/paket');
      return;
    }
    loadPaket();
  }, [id]);

  const loadPaket = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('packages').select('*').eq('id', id).single();
      if (error) throw error;
      if (!data) {
        router.push('/admin/dashboard/paket');
        return;
      }
      setPkg(data as Package);
      setIncludes(toStringArray(data.includes));
      setExcluded(toStringArray(data.excluded));
      setSuitableFor(toStringArray(data.suitable_for));
      setCoverImageUrl(data.cover_image_url ?? null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkg) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const descriptionArr = toStringArray(pkg.description).filter((s) => s.trim());
      const { error } = await supabase
        .from('packages')
        .update({
          name: pkg.name,
          slug: pkg.slug,
          description: descriptionArr,
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
          is_featured: pkg.is_featured,
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

  if (loading)
    return (
      <AdminDashboardLayout title="Edit Paket">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-3 border-accent border-t-transparent mx-auto" />
          <p className="text-muted text-sm mt-3">Memuat paket...</p>
        </div>
      </AdminDashboardLayout>
    );

  if (error && !pkg)
    return (
      <AdminDashboardLayout title="Edit Paket">
        <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl m-6">
          {error}
        </div>
      </AdminDashboardLayout>
    );

  if (!pkg) return null;

  return (
    <AdminDashboardLayout
      eyebrow="Paket"
      title={`Edit: ${pkg.name}`}
      subtitle="Perbarui detail paket perjalanan."
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
              <Check size={16} /> Perubahan disimpan
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Nama Paket *
              </label>
              <input
                type="text"
                value={pkg.name}
                onChange={(e) => setPkg({ ...pkg, name: e.target.value })}
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
                value={pkg.slug}
                onChange={(e) => setPkg({ ...pkg, slug: e.target.value })}
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
              value={pkg.badge || ''}
              onChange={(e) => setPkg({ ...pkg, badge: e.target.value || null })}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="Best Seller"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Deskripsi (satu paragraf per baris)
            </label>
            <textarea
              value={toStringArray(pkg.description).join('\n\n')}
              onChange={(e) =>
                setPkg({
                  ...pkg,
                  description: e.target.value
                    .split(/\n\n+/)
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              rows={4}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Destinasi *
              </label>
              <input
                list="destinations-list"
                type="text"
                value={pkg.destination}
                onChange={(e) => setPkg({ ...pkg, destination: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="Pilih atau ketik baru"
                required
              />
              <datalist id="destinations-list">
                {DESTINATIONS.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Hari
              </label>
              <input
                type="number"
                value={pkg.duration_days}
                onChange={(e) =>
                  setPkg({ ...pkg, duration_days: parseInt(e.target.value) || 1 })
                }
                min={1}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Jam
              </label>
              <input
                type="number"
                value={pkg.duration_hours || ''}
                onChange={(e) =>
                  setPkg({
                    ...pkg,
                    duration_hours: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                min={1}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Label
              </label>
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
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Harga (Rp) *
            </label>
            <input
              type="number"
              value={pkg.price}
              onChange={(e) => setPkg({ ...pkg, price: parseInt(e.target.value) || 0 })}
              min={0}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Termasuk
            </label>
            <div className="flex flex-wrap gap-2">
              {INCLUDES.map((item) => (
                <CheckboxChip
                  key={item}
                  id={`inc-${item}`}
                  label={item}
                  checked={includes.includes(item)}
                  onChange={(c) =>
                    setIncludes(c ? [...includes, item] : includes.filter((i) => i !== item))
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Tidak Termasuk
            </label>
            <div className="flex flex-wrap gap-2">
              {EXCLUDED_OPTIONS.map((item) => (
                <CheckboxChip
                  key={item}
                  id={`exc-${item}`}
                  label={item}
                  checked={excluded.includes(item)}
                  onChange={(c) =>
                    setExcluded(c ? [...excluded, item] : excluded.filter((i) => i !== item))
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Cocok Untuk
            </label>
            <div className="flex flex-wrap gap-2">
              {SUITABLE_FOR.map((item) => (
                <CheckboxChip
                  key={item}
                  id={`suit-${item}`}
                  label={item}
                  checked={suitableFor.includes(item)}
                  onChange={(c) =>
                    setSuitableFor(c ? [...suitableFor, item] : suitableFor.filter((i) => i !== item))
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Cover
            </label>
            <ImageUpload
              bucket="packages"
              onUpload={(url) => setCoverImageUrl(url || null)}
              currentUrl={coverImageUrl}
              label="Cover Paket"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-line">
            <ToggleField
              label="Tampilkan di Website"
              description="Paket muncul di halaman /paket"
              checked={pkg.is_active}
              onChange={(c) => setPkg({ ...pkg, is_active: c })}
            />
            <ToggleField
              label="Tampilkan di Beranda"
              description="Paket muncul di section utama homepage"
              checked={pkg.is_featured}
              onChange={(c) => setPkg({ ...pkg, is_featured: c })}
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

function CheckboxChip({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (c: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border cursor-pointer transition select-none ${
        checked
          ? 'bg-accent text-white border-accent'
          : 'bg-white text-heading border-line hover:border-accent'
      }`}
    >
      <input
        type="checkbox"
        id={id}
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