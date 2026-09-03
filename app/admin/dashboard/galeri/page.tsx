'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import {
  Trash2,
  Plus,
  Edit,
  Image as ImageIcon,
  MapPin,
  Search,
} from 'lucide-react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { Badge, ACTIVE_TONE, INACTIVE_TONE, Tone } from '@/components/admin/badge';

type GalleryItem = {
  id: string;
  caption: string;
  image_url: string;
  category: string;
  location: string | null;
  display_order: number;
  is_active: boolean;
};

type StatusFilter = 'active' | 'inactive' | 'all';

const CATEGORY_TONE: Record<string, Tone> = {
  perjalanan: 'success',
  kendaraan: 'accent',
  pelanggan: 'warning',
  general: 'muted',
};

const CATEGORY_LABEL: Record<string, string> = {
  perjalanan: 'Perjalanan',
  kendaraan: 'Kendaraan',
  pelanggan: 'Pelanggan',
  general: 'Umum',
};

export default function GaleriList() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active');
  const [query, setQuery] = useState('');
  const supabase = createClient();

  useEffect(() => {
    fetchItems();
  }, [selectedCategory, statusFilter]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('gallery_items')
        .select('*')
        .order('display_order')
        .order('created_at', { ascending: false });

      if (statusFilter === 'active') query = query.eq('is_active', true);
      if (statusFilter === 'inactive') query = query.eq('is_active', false);
      if (selectedCategory !== 'all') query = query.eq('category', selectedCategory);

      const { data, error } = await query;
      if (error) throw error;
      setItems(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (g: GalleryItem) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .update({ is_active: !g.is_active })
        .eq('id', g.id);
      if (error) throw error;
      await fetchItems();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  const handleDelete = async (g: GalleryItem) => {
    if (!window.confirm(`Hapus foto "${g.caption}"?`)) return;
    try {
      const { error } = await supabase.from('gallery_items').delete().eq('id', g.id);
      if (error) throw error;
      await fetchItems();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  const statusFilters: { value: StatusFilter; label: string }[] = [
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Nonaktif' },
    { value: 'all', label: 'Semua' },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.caption.toLowerCase().includes(q) ||
        (i.location || '').toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <AdminDashboardLayout
      eyebrow="Galeri"
      title="Kelola Galeri"
      subtitle="Upload dan atur foto dokumentasi perjalanan."
    >
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-muted">
              {statusFilter === 'active'
                ? `${items.length} foto aktif`
                : statusFilter === 'inactive'
                ? `${items.length} foto nonaktif`
                : `${items.length} total foto`}
            </p>
            <Link
              href="/admin/dashboard/galeri/new"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] whitespace-nowrap"
            >
              <Plus size={18} /> Upload Galeri
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              {statusFilters.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStatusFilter(s.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    statusFilter === s.value
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white text-heading border-line hover:border-accent'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              <option value="all">Semua Kategori</option>
              {Object.entries(CATEGORY_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari caption atau lokasi..."
              className="w-full pl-9 pr-3 py-2 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </div>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-3 border-accent border-t-transparent mx-auto" />
            <p className="text-muted text-sm mt-3">Memuat galeri...</p>
          </div>
        )}
        {error && <div className="p-8 text-center text-error">{error}</div>}

        {items.length === 0 && !loading && !error && (
          <div className="p-8 text-center">
            <ImageIcon size={32} className="mx-auto text-muted" />
            <p className="mt-3 text-sm text-muted">Belum ada foto di galeri.</p>
            <Link
              href="/admin/dashboard/galeri/new"
              className="inline-flex items-center gap-1.5 mt-3 text-accent text-sm font-bold hover:underline"
            >
              <Plus size={14} /> Upload foto pertama
            </Link>
          </div>
        )}

        {items.length > 0 && filtered.length === 0 && !loading && (
          <p className="text-center text-muted py-8">Tidak ada foto yang cocok dengan "{query}"</p>
        )}

        {items.length > 0 && (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-line">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Foto
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Caption
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Kategori
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Lokasi
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Urutan
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filtered.map((g) => (
                    <tr key={g.id} className="hover:bg-surface/50 transition">
                      <td className="px-4 py-3">
                        <img
                          src={g.image_url}
                          alt={g.caption}
                          className="h-12 w-16 object-cover rounded-xl"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-heading max-w-md truncate">
                        {g.caption}
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone={CATEGORY_TONE[g.category] || 'muted'}>
                          {CATEGORY_LABEL[g.category] || g.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">
                        {g.location ? (
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={12} /> {g.location}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-accent">
                        {g.display_order}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(g)}
                          className="cursor-pointer"
                          title={g.is_active ? 'Klik untuk nonaktifkan' : 'Klik untuk aktifkan'}
                        >
                          <Badge tone={g.is_active ? ACTIVE_TONE : INACTIVE_TONE}>
                            {g.is_active ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/dashboard/galeri/${g.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-white text-sm font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                          >
                            <Edit size={14} /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(g)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-white text-sm font-medium text-error hover:bg-error/10 hover:border-error transition"
                          >
                            <Trash2 size={14} /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden grid grid-cols-2 gap-3">
              {filtered.map((g) => (
                <div
                  key={g.id}
                  className="rounded-xl border border-line bg-white overflow-hidden"
                >
                  <Link href={`/admin/dashboard/galeri/${g.id}`}>
                    <img
                      src={g.image_url}
                      alt={g.caption}
                      className="aspect-square w-full object-cover"
                    />
                  </Link>
                  <div className="p-3">
                    <p className="text-sm font-bold text-heading line-clamp-2 mb-2">
                      {g.caption}
                    </p>
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                      <Badge tone={CATEGORY_TONE[g.category] || 'muted'}>
                        {CATEGORY_LABEL[g.category] || g.category}
                      </Badge>
                      <Badge tone={g.is_active ? ACTIVE_TONE : INACTIVE_TONE}>
                        {g.is_active ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/dashboard/galeri/${g.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-xs font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                      >
                        <Edit size={12} /> Edit
                      </Link>
                      <button
                        onClick={() => toggleActive(g)}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-line text-xs font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                      >
                        {g.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                      <button
                        onClick={() => handleDelete(g)}
                        className="flex items-center justify-center px-3 py-1.5 rounded-xl border border-line text-xs font-medium text-error hover:bg-error/10 hover:border-error transition"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminDashboardLayout>
  );
}