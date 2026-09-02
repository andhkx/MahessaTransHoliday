'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Trash2, Plus, Edit, Image as ImageIcon, MapPin } from 'lucide-react';
import { cn } from '@/lib/cn';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

type GalleryItem = {
  id: string;
  caption: string;
  image_url: string;
  category: string;
  location: string | null;
  display_order: number;
  is_active: boolean;
};

const categoryStyle = (c: string): string => {
  if (c === 'perjalanan') return 'bg-success/20 text-success';
  if (c === 'kendaraan') return 'bg-accent/20 text-accent';
  if (c === 'pelanggan') return 'bg-warning/20 text-warning';
  return 'bg-muted/20 text-muted';
};

export default function GaleriList() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus foto ini?')) return;
    try {
      const { error } = await supabase
        .from('gallery_items')
        .update({ is_active: false })
        .eq('id', id);
      if (error) throw error;
      await fetchItems();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <AdminDashboardLayout title="Galeri">
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-heading">Kelola Galeri</h1>
            <p className="text-sm text-muted mt-1">Total {items.length} foto aktif</p>
          </div>
          <Link
            href="/admin/dashboard/galeri/new"
            className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] whitespace-nowrap"
          >
            <Plus size={18} /> Upload Galeri
          </Link>
        </div>

        {loading && <div className="p-8 text-center text-muted">Loading...</div>}
        {error && <div className="p-8 text-center text-error">{error}</div>}

        {items.length === 0 && !loading && !error && (
          <div className="p-8 text-center">
            <ImageIcon size={32} className="mx-auto text-muted" />
            <p className="mt-3 text-sm text-muted">Belum ada foto di galeri.</p>
            <Link href="/admin/dashboard/galeri/new" className="inline-flex items-center gap-1.5 mt-3 text-accent text-sm font-bold hover:underline">
              <Plus size={14} /> Upload foto pertama
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-line">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Foto</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Caption</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Kategori</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Lokasi</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Urutan</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {items.map((g) => (
                    <tr key={g.id} className="hover:bg-surface/50 transition">
                      <td className="px-4 py-3">
                        <img src={g.image_url} alt={g.caption} className="h-12 w-16 object-cover rounded-xl" />
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-heading max-w-md truncate">{g.caption}</td>
                      <td className="px-4 py-3">
                        <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold capitalize', categoryStyle(g.category))}>
                          {g.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{g.location || '-'}</td>
                      <td className="px-4 py-3 text-sm text-muted">{g.display_order}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/dashboard/galeri/${g.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-sm font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                          >
                            <Edit size={14} /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(g.id)}
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

            {/* Mobile Grid */}
            <div className="lg:hidden grid grid-cols-2 gap-3">
              {items.map((g) => (
                <Link
                  key={g.id}
                  href={`/admin/dashboard/galeri/${g.id}`}
                  className="block rounded-xl border border-line bg-white hover:bg-accent/5 hover:border-accent transition overflow-hidden"
                >
                  <img src={g.image_url} alt={g.caption} className="aspect-square w-full object-cover" />
                  <div className="p-3">
                    <p className="text-sm font-bold text-heading line-clamp-2 mb-2">{g.caption}</p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold capitalize', categoryStyle(g.category))}>
                        {g.category}
                      </span>
                      {g.location && (
                        <span className="text-[10px] text-muted flex items-center gap-1">
                          <MapPin size={10} /> {g.location}
                        </span>
                      )}
                    </div>
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