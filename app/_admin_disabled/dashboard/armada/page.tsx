'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Trash2, Plus, Edit, ChevronDown } from 'lucide-react';
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
  if (category === 'midrange') return 'bg-warning/20 text-warning';
  if (category === 'premium') return 'bg-accent/20 text-accent';
  if (category === 'luxury') return 'bg-error/20 text-error';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('vehicles')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      setVehicles(data || []);
    } catch (err: any) {
      setError(err.message);
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
    } catch (err: any) {
      alert(err.message);
    }
  };

  const categories = ['all', 'entry', 'midrange', 'premium', 'luxury', 'group'] as const;

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-error">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-heading">Armada</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard/armada/new"
            className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl font-extrabold hover:bg-accent-hover transition"
          >
            <Plus size={18} /> Tambah Armada
          </Link>
          <div className="relative">
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-1">
              Kategori
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Semua' : categoryLabel(cat)}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </div>
      </div>

      {vehicles.length === 0 ? (
        <p className="text-center text-muted py-8">Belum ada armada yang tersedia.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-line">
            <thead className="bg-surface">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Transmisi</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Harga/Hari</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Kapasitas</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-surface/50">
                  <td className="px-6 py-4 text-sm font-mono text-muted">{v.id.slice(0, 8)}</td>
                  <td className="px-6 py-4 text-sm font-bold text-heading">{v.name}</td>
                  <td className="px-6 py-4 text-sm text-muted">
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-bold', categoryStyle(v.category))}>
                      {categoryLabel(v.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">{v.transmission}</td>
                  <td className="px-6 py-4 text-sm font-bold text-accent">
                    {`Rp${v.price_per_day.toLocaleString()}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">{v.capacity} orang</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-bold',
                        v.is_active ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                      )}
                    >
                      {v.is_active ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex space-x-2">
                    <Link
                      href={`/admin/dashboard/armada/${v.id}`}
                      className="flex items-center gap-2 px-3 py-1.5 rounded border border-line text-sm font-medium text-heading hover:bg-accent/10"
                    >
                      <Edit size={16} /> Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(v.id)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded border border-line text-sm font-medium text-error hover:bg-error/10"
                    >
                      <Trash2 size={16} /> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
