'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Trash2, Plus, Edit, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

type Package = {
  id: string;
  name: string;
  slug: string;
  destination: string;
  price: number;
  duration_days: number;
  is_active: boolean;
};

export default function PaketList() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const supabase = createClient();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (selectedDestination !== 'all') {
        query = query.eq('destination', selectedDestination);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPackages(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus paket ini?')) return;
    try {
      const { error } = await supabase
        .from('packages')
        .update({ is_active: false })
        .eq('id', id);
      if (error) throw error;
      await fetchPackages();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const destinations = ['all', 'Bandung', 'Garut', 'Jakarta', 'Yogya', 'Bali'] as const;

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-error">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-heading">Paket Perjalanan</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard/paket/new"
            className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl font-extrabold hover:bg-accent-hover transition"
          >
            <Plus size={18} /> Tambah Paket
          </Link>
          <div className="relative">
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-1">
              Destinasi
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full px-4 py-2 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest === 'all' ? 'Semua' : dest}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </div>
      </div>

      {packages.length === 0 ? (
        <p className="text-center text-muted py-8">Belum ada paket yang tersedia.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-line">
            <thead className="bg-surface">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Destinasi</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Durasi</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Harga</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {packages.map((p) => (
                <tr key={p.id} className="hover:bg-surface/50">
                  <td className="px-6 py-4 text-sm font-mono text-muted">{p.id.slice(0, 8)}</td>
                  <td className="px-6 py-4 text-sm font-bold text-heading">{p.name}</td>
                  <td className="px-6 py-4 text-sm text-muted">{p.destination}</td>
                  <td className="px-6 py-4 text-sm">{p.duration_days} hari</td>
                  <td className="px-6 py-4 text-sm font-bold text-accent">
                    Rp{`${p.price.toLocaleString()}`}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${p.is_active ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                      {p.is_active ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex space-x-2">
                    <Link
                      href={`/admin/dashboard/paket/${p.id}`}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-border border border-line text-sm font-medium text-heading hover:bg-accent/10"
                    >
                      <Edit size={16} /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-border border border-line text-sm font-medium text-error hover:bg-error/10"
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