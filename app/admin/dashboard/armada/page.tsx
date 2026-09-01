'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { CarFront, Plus, Edit, Trash2, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { formatIDR } from '@/lib/format';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

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
};

const categoryLabel = (category: string): string => {
  if (category === 'entry') return 'City Car';
  if (category === 'midrange') return 'MPV';
  if (category === 'premium') return 'SUV & Premium';
  if (category === 'luxury') return 'Luxury';
  if (category === 'group') return 'Group';
  return category;
};

const categoryStyle = (category: string): string => {
  if (category === 'entry') return 'bg-success/20 text-success';
  if (category === 'midrange') return 'bg-accent/20 text-accent';
  if (category === 'premium') return 'bg-primary/20 text-primary';
  if (category === 'luxury') return 'bg-warning/20 text-warning';
  if (category === 'group') return 'bg-error/20 text-error';
  return 'bg-muted/20 text-muted';
};

export default function ArmadaList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const supabase = createClient();

  useEffect(() => {
    fetchVehicles();
  }, [selectedCategory]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('vehicles')
        .select('id,name,slug,category,transmission,fuel_type,price_per_day,capacity,badge,image_url,is_active')
        .eq('is_active', true)
        .order('category')
        .order('price_per_day');

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      setVehicles(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus armada ini?')) return;
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ is_active: false })
        .eq('id', id);
      if (error) throw error;
      await fetchVehicles();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  const categories = ['all', 'entry', 'midrange', 'premium', 'luxury', 'group'] as const;

  return (
    <AdminDashboardLayout title="Armada">
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-heading">Kelola Armada</h1>
            <p className="text-sm text-muted mt-1">Total {vehicles.length} unit aktif</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15 w-full sm:w-auto"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Semua Kategori' : categoryLabel(cat)}
                </option>
              ))}
            </select>
            <Link
              href="/admin/dashboard/armada/new"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] whitespace-nowrap"
            >
              <Plus size={18} /> Tambah Armada
            </Link>
          </div>
        </div>

        {loading && <div className="p-8 text-center text-muted">Loading...</div>}
        {error && <div className="p-8 text-center text-error">{error}</div>}

        {vehicles.length === 0 && !loading && !error && (
          <p className="text-center text-muted py-8">Belum ada armada yang tersedia.</p>
        )}

        {vehicles.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-line">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Foto</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Nama</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Kategori</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Transmisi</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Harga</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Kapasitas</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {vehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-surface/50 transition">
                      <td className="px-4 py-3">
                        {v.image_url ? (
                          <img src={v.image_url} alt={v.name} className="h-12 w-16 object-cover rounded-xl" />
                        ) : (
                          <div className="h-12 w-16 bg-surface rounded-xl flex items-center justify-center">
                            <ImageIcon size={16} className="text-muted" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-heading">{v.name}</span>
                          {v.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-warning/20 text-warning text-[10px] font-bold uppercase">
                              {v.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted font-mono mt-0.5">{v.slug}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold', categoryStyle(v.category))}>
                          {categoryLabel(v.category)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{v.transmission}</td>
                      <td className="px-4 py-3 text-sm font-bold text-accent">{formatIDR(v.price_per_day)}<span className="text-[10px] text-muted font-normal">/12jam</span></td>
                      <td className="px-4 py-3 text-sm text-muted">{v.capacity} orang</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/dashboard/armada/${v.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-sm font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                          >
                            <Edit size={14} /> Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(v.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-sm font-medium text-error hover:bg-error/10 hover:border-error transition"
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

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
              {vehicles.map((v) => (
                <Link
                  key={v.id}
                  href={`/admin/dashboard/armada/${v.id}`}
                  className="flex items-start gap-3 p-3 rounded-xl border border-line bg-white hover:bg-accent/5 hover:border-accent transition"
                >
                  {v.image_url ? (
                    <img src={v.image_url} alt={v.name} className="h-20 w-24 object-cover rounded-xl flex-shrink-0" />
                  ) : (
                    <div className="h-20 w-24 bg-surface rounded-xl flex items-center justify-center flex-shrink-0">
                      <ImageIcon size={20} className="text-muted" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-heading truncate">{v.name}</h3>
                      {v.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-warning/20 text-warning text-[10px] font-bold uppercase">
                          {v.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted font-mono mt-0.5 truncate">{v.slug}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap text-sm text-muted">
                      <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold', categoryStyle(v.category))}>
                        {categoryLabel(v.category)}
                      </span>
                      <span>{v.transmission}</span>
                      <span className="font-bold text-accent">{formatIDR(v.price_per_day)}</span>
                      <span>{v.capacity} orang</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Edit size={16} className="text-muted" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminDashboardLayout>
  );
}