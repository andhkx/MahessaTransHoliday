'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import {
  CarFront,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';
import { formatIDR } from '@/lib/format';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import {
  Badge,
  VEHICLE_CATEGORY_LABEL,
  VEHICLE_CATEGORY_TONE,
  ACTIVE_TONE,
  INACTIVE_TONE,
} from '@/components/admin/badge';

type Vehicle = {
  id: string;
  name: string;
  slug: string;
  category: string;
  transmission: string;
  fuel_type: string;
  price_per_day: number;
  capacity: number;
  badge: string | null;
  image_url: string | null;
  is_active: boolean;
  is_featured: boolean;
};

type StatusFilter = 'active' | 'inactive' | 'all';

export default function ArmadaList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active');
  const supabase = createClient();

  useEffect(() => {
    fetchVehicles();
  }, [selectedCategory, statusFilter]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('vehicles')
        .select(
          'id,name,slug,category,transmission,fuel_type,price_per_day,capacity,badge,image_url,is_active,is_featured'
        )
        .order('category')
        .order('price_per_day');

      if (statusFilter === 'active') query = query.eq('is_active', true);
      if (statusFilter === 'inactive') query = query.eq('is_active', false);
      if (selectedCategory !== 'all') query = query.eq('category', selectedCategory);

      const { data, error } = await query;
      if (error) throw error;
      setVehicles(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (v: Vehicle) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ is_active: !v.is_active })
        .eq('id', v.id);
      if (error) throw error;
      await fetchVehicles();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  const handleDelete = async (v: Vehicle) => {
    if (!window.confirm(`Hapus armada "${v.name}"?`)) return;
    try {
      const { error } = await supabase.from('vehicles').delete().eq('id', v.id);
      if (error) throw error;
      await fetchVehicles();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  const categories = ['all', 'entry', 'midrange', 'premium', 'luxury', 'group'] as const;
  const statusFilters: { value: StatusFilter; label: string }[] = [
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Nonaktif' },
    { value: 'all', label: 'Semua' },
  ];

  return (
    <AdminDashboardLayout
      eyebrow="Armada"
      title="Kelola Armada"
      subtitle="Tambah, edit, dan atur visibilitas armada rental."
    >
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm text-muted">
                {statusFilter === 'active'
                  ? `${vehicles.length} unit aktif`
                  : statusFilter === 'inactive'
                  ? `${vehicles.length} unit nonaktif`
                  : `${vehicles.length} total unit`}
              </p>
            </div>
            <Link
              href="/admin/dashboard/armada/new"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] whitespace-nowrap"
            >
              <Plus size={18} /> Tambah Armada
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
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'Semua Kategori' : VEHICLE_CATEGORY_LABEL[cat]}
                  </option>
                ))}
              </select>
          </div>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-3 border-accent border-t-transparent mx-auto" />
            <p className="text-muted text-sm mt-3">Memuat armada...</p>
          </div>
        )}
        {error && <div className="p-8 text-center text-error">{error}</div>}

        {vehicles.length === 0 && !loading && !error && (
          <p className="text-center text-muted py-8">Belum ada armada yang tersedia.</p>
        )}

        {vehicles.length > 0 && (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-line">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Foto
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Nama
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Kategori
                    </th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Transmisi
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
                  {vehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-surface/50 transition">
                      <td className="px-4 py-3">
                        {v.image_url ? (
                          <img
                            src={v.image_url}
                            alt={v.name}
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
                          <span className="text-sm font-bold text-heading">{v.name}</span>
                          {v.badge && <Badge tone="warning">{v.badge}</Badge>}
                          {v.is_featured && <Badge tone="primary">Featured</Badge>}
                        </div>
                        <p className="text-xs text-muted font-mono mt-0.5">{v.slug}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone={VEHICLE_CATEGORY_TONE[v.category] || 'muted'}>
                          {VEHICLE_CATEGORY_LABEL[v.category] || v.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{v.transmission}</td>
                      <td className="px-4 py-3 text-sm font-bold text-accent">
                        {formatIDR(v.price_per_day)}
                        <span className="text-[10px] text-muted font-normal">/12jam</span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(v)}
                          className="cursor-pointer"
                          title={v.is_active ? 'Klik untuk nonaktifkan' : 'Klik untuk aktifkan'}
                        >
                          <Badge tone={v.is_active ? ACTIVE_TONE : INACTIVE_TONE}>
                            {v.is_active ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/dashboard/armada/${v.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-white text-sm font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                          >
                            <Edit size={14} /> Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(v)}
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
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="p-3 rounded-xl border border-line bg-white hover:bg-accent/5 transition"
                >
                  <div className="flex items-start gap-3">
                    {v.image_url ? (
                      <img
                        src={v.image_url}
                        alt={v.name}
                        className="h-20 w-24 object-cover rounded-xl flex-shrink-0"
                      />
                    ) : (
                      <div className="h-20 w-24 bg-surface rounded-xl flex items-center justify-center flex-shrink-0">
                        <ImageIcon size={20} className="text-muted" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-heading truncate">{v.name}</h3>
                        {v.badge && <Badge tone="warning">{v.badge}</Badge>}
                        {v.is_featured && <Badge tone="primary">Featured</Badge>}
                      </div>
                      <p className="text-xs text-muted font-mono mt-0.5 truncate">{v.slug}</p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <Badge tone={VEHICLE_CATEGORY_TONE[v.category] || 'muted'}>
                          {VEHICLE_CATEGORY_LABEL[v.category] || v.category}
                        </Badge>
                        <Badge tone={v.is_active ? ACTIVE_TONE : INACTIVE_TONE}>
                          {v.is_active ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted">
                        <span>{v.transmission}</span>
                        <span>·</span>
                        <span className="font-bold text-accent">
                          {formatIDR(v.price_per_day)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Link
                      href={`/admin/dashboard/armada/${v.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-xs font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                    >
                      <Edit size={12} /> Edit
                    </Link>
                    <button
                      onClick={() => toggleActive(v)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-xs font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                    >
                      {v.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                    <button
                      onClick={() => handleDelete(v)}
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