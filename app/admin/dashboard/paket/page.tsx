'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Trash2, Plus, Edit, Image as ImageIcon } from 'lucide-react';
import { formatIDR } from '@/lib/format';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { Badge, ACTIVE_TONE, INACTIVE_TONE } from '@/components/admin/badge';

type Package = {
  id: string;
  name: string;
  slug: string;
  destination: string;
  duration_text: string | null;
  price: number;
  badge: string | null;
  cover_image_url: string | null;
  is_active: boolean;
  is_featured: boolean;
};

type StatusFilter = 'active' | 'inactive' | 'all';

const DESTINATION_TONE: Record<string, 'accent' | 'success' | 'warning' | 'error' | 'primary'> = {
  Bandung: 'success',
  Garut: 'accent',
  Jakarta: 'warning',
  Yogyakarta: 'primary',
  Bali: 'error',
  Pangalengan: 'success',
  Ciwidey: 'success',
  Pangandaran: 'warning',
  Bromo: 'primary',
  Semarang: 'accent',
};

export default function PaketList() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active');
  const supabase = createClient();

  useEffect(() => {
    fetchPackages();
  }, [selectedDestination, statusFilter]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('packages')
        .select(
          'id,name,slug,destination,duration_text,price,badge,cover_image_url,is_active,is_featured'
        )
        .order('price');

      if (statusFilter === 'active') query = query.eq('is_active', true);
      if (statusFilter === 'inactive') query = query.eq('is_active', false);
      if (selectedDestination !== 'all') query = query.eq('destination', selectedDestination);

      const { data, error } = await query;
      if (error) throw error;
      setPackages(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (p: Package) => {
    try {
      const { error } = await supabase
        .from('packages')
        .update({ is_active: !p.is_active })
        .eq('id', p.id);
      if (error) throw error;
      await fetchPackages();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  const handleDelete = async (p: Package) => {
    if (!window.confirm(`Hapus paket "${p.name}"?`)) return;
    try {
      const { error } = await supabase.from('packages').delete().eq('id', p.id);
      if (error) throw error;
      await fetchPackages();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  const destinations = [
    'all',
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
  ] as const;
  const statusFilters: { value: StatusFilter; label: string }[] = [
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Nonaktif' },
    { value: 'all', label: 'Semua' },
  ];

  return (
    <AdminDashboardLayout
      eyebrow="Paket"
      title="Kelola Paket Perjalanan"
      subtitle="Tambah, edit, dan atur visibilitas paket wisata."
    >
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-muted">
              {statusFilter === 'active'
                ? `${packages.length} paket aktif`
                : statusFilter === 'inactive'
                ? `${packages.length} paket nonaktif`
                : `${packages.length} total paket`}
            </p>
            <Link
              href="/admin/dashboard/paket/new"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] whitespace-nowrap"
            >
              <Plus size={18} /> Tambah Paket
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
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="px-4 py-2 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest === 'all' ? 'Semua Destinasi' : dest}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-3 border-accent border-t-transparent mx-auto" />
            <p className="text-muted text-sm mt-3">Memuat paket...</p>
          </div>
        )}
        {error && <div className="p-8 text-center text-error">{error}</div>}

        {packages.length === 0 && !loading && !error && (
          <p className="text-center text-muted py-8">Belum ada paket yang tersedia.</p>
        )}

        {packages.length > 0 && (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-line">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Cover
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Nama
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Destinasi
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Durasi
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Harga
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
                  {packages.map((p) => (
                    <tr key={p.id} className="hover:bg-surface/50 transition">
                      <td className="px-4 py-3">
                        {p.cover_image_url ? (
                          <img
                            src={p.cover_image_url}
                            alt={p.name}
                            className="h-12 w-16 object-cover rounded-xl"
                          />
                        ) : (
                          <div className="h-12 w-16 bg-surface rounded-xl flex items-center justify-center">
                            <ImageIcon size={16} className="text-muted" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-heading">{p.name}</span>
                          {p.badge && <Badge tone="warning">{p.badge}</Badge>}
                          {p.is_featured && <Badge tone="primary">Featured</Badge>}
                        </div>
                        <p className="text-xs text-muted font-mono mt-0.5">{p.slug}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone={DESTINATION_TONE[p.destination] || 'muted'}>
                          {p.destination}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{p.duration_text || '-'}</td>
                      <td className="px-4 py-3 text-sm font-bold text-accent">
                        {formatIDR(p.price)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(p)}
                          className="cursor-pointer"
                          title={p.is_active ? 'Klik untuk nonaktifkan' : 'Klik untuk aktifkan'}
                        >
                          <Badge tone={p.is_active ? ACTIVE_TONE : INACTIVE_TONE}>
                            {p.is_active ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/dashboard/paket/${p.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-white text-sm font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                          >
                            <Edit size={14} /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(p)}
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

            <div className="lg:hidden space-y-3">
              {packages.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl border border-line bg-white hover:bg-accent/5 transition"
                >
                  <div className="flex items-start gap-3">
                    {p.cover_image_url ? (
                      <img
                        src={p.cover_image_url}
                        alt={p.name}
                        className="h-20 w-24 object-cover rounded-xl flex-shrink-0"
                      />
                    ) : (
                      <div className="h-20 w-24 bg-surface rounded-xl flex items-center justify-center flex-shrink-0">
                        <ImageIcon size={20} className="text-muted" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-heading truncate">{p.name}</h3>
                        {p.badge && <Badge tone="warning">{p.badge}</Badge>}
                        {p.is_featured && <Badge tone="primary">Featured</Badge>}
                      </div>
                      <p className="text-xs text-muted font-mono mt-0.5 truncate">{p.slug}</p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <Badge tone={DESTINATION_TONE[p.destination] || 'muted'}>
                          {p.destination}
                        </Badge>
                        <Badge tone={p.is_active ? ACTIVE_TONE : INACTIVE_TONE}>
                          {p.is_active ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted">
                        <span>{p.duration_text}</span>
                        <span>·</span>
                        <span className="font-bold text-accent">{formatIDR(p.price)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Link
                      href={`/admin/dashboard/paket/${p.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-xs font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                    >
                      <Edit size={12} /> Edit
                    </Link>
                    <button
                      onClick={() => toggleActive(p)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-xs font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                    >
                      {p.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                    <button
                      onClick={() => handleDelete(p)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-xs font-medium text-error hover:bg-error/10 hover:border-error transition"
                    >
                      <Trash2 size={12} />
                    </button>
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