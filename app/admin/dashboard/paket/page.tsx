'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Trash2, Plus, Edit, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { formatIDR } from '@/lib/format';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

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
};

const destinationStyle = (dest: string): string => {
  const map: Record<string, string> = {
    Bandung: 'bg-success/20 text-success',
    Garut: 'bg-accent/20 text-accent',
    Jakarta: 'bg-warning/20 text-warning',
    Yogyakarta: 'bg-primary/20 text-primary',
    Bali: 'bg-error/20 text-error',
    Pangalengan: 'bg-success/20 text-success',
    Ciwidey: 'bg-success/20 text-success',
    Pangandaran: 'bg-warning/20 text-warning',
    Bromo: 'bg-primary/20 text-primary',
    Semarang: 'bg-accent/20 text-accent',
  };
  return map[dest] || 'bg-muted/20 text-muted';
};

export default function PaketList() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const supabase = createClient();

  useEffect(() => {
    fetchPackages();
  }, [selectedDestination]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('packages')
        .select('id,name,slug,destination,duration_text,price,badge,cover_image_url,is_active')
        .eq('is_active', true)
        .order('price');

      if (selectedDestination !== 'all') {
        query = query.eq('destination', selectedDestination);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPackages(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
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
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  const destinations = ['all', 'Bandung', 'Garut', 'Jakarta', 'Yogyakarta', 'Bali', 'Pangalengan', 'Ciwidey', 'Pangandaran', 'Bromo', 'Semarang'] as const;

  return (
    <AdminDashboardLayout title="Paket Perjalanan">
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-heading">Kelola Paket</h1>
            <p className="text-sm text-muted mt-1">Total {packages.length} paket aktif</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="px-4 py-2.5 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15 w-full sm:w-auto"
            >
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest === 'all' ? 'Semua Destinasi' : dest}
                </option>
              ))}
            </select>
            <Link
              href="/admin/dashboard/paket/new"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] whitespace-nowrap"
            >
              <Plus size={18} /> Tambah Paket
            </Link>
          </div>
        </div>

        {loading && <div className="p-8 text-center text-muted">Loading...</div>}
        {error && <div className="p-8 text-center text-error">{error}</div>}

        {packages.length === 0 && !loading && !error && (
          <p className="text-center text-muted py-8">Belum ada paket yang tersedia.</p>
        )}

        {packages.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-line">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Cover</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Nama</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Destinasi</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Durasi</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Harga</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {packages.map((p) => (
                    <tr key={p.id} className="hover:bg-surface/50 transition">
                      <td className="px-4 py-3">
                        {p.cover_image_url ? (
                          <img src={p.cover_image_url} alt={p.name} className="h-12 w-16 object-cover rounded-xl" />
                        ) : (
                          <div className="h-12 w-16 bg-surface rounded-xl flex items-center justify-center">
                            <ImageIcon size={16} className="text-muted" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-heading">{p.name}</span>
                          {p.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-warning/20 text-warning text-[10px] font-bold uppercase">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted font-mono mt-0.5">{p.slug}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold', destinationStyle(p.destination))}>
                          {p.destination}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{p.duration_text || '-'}</td>
                      <td className="px-4 py-3 text-sm font-bold text-accent">{formatIDR(p.price)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/dashboard/paket/${p.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-sm font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                          >
                            <Edit size={14} /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id)}
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
              {packages.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/dashboard/paket/${p.id}`}
                  className="flex items-start gap-3 p-3 rounded-xl border border-line bg-white hover:bg-accent/5 hover:border-accent transition"
                >
                  {p.cover_image_url ? (
                    <img src={p.cover_image_url} alt={p.name} className="h-20 w-24 object-cover rounded-xl flex-shrink-0" />
                  ) : (
                    <div className="h-20 w-24 bg-surface rounded-xl flex items-center justify-center flex-shrink-0">
                      <ImageIcon size={20} className="text-muted" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-heading truncate">{p.name}</h3>
                      {p.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-warning/20 text-warning text-[10px] font-bold uppercase">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted font-mono mt-0.5 truncate">{p.slug}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap text-sm text-muted">
                      <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold', destinationStyle(p.destination))}>
                        {p.destination}
                      </span>
                      <span>{p.duration_text}</span>
                      <span className="font-bold text-accent">{formatIDR(p.price)}</span>
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