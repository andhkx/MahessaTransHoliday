'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Trash2, Plus, Edit, Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import AvatarInitials from '@/components/TestimonialCarousel/AvatarInitials';
import AdminDashboardLayout from '@/app/admin/dashboard/layout';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  service_type: string | null;
  is_active: boolean;
};

export default function TestimoniList() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const supabase = createClient();

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (filterActive === 'active') {
        query = query.eq('is_active', true);
      } else if (filterActive === 'inactive') {
        query = query.eq('is_active', false);
      }
      const { data, error } = await query;
      if (error) throw error;
      setTestimonials(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [filterActive]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus testimoni ini?')) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      await fetchTestimonials();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-error">{error}</div>;

  return (
    <AdminDashboardLayout title="Testimoni Pelanggan">
      <div className="bg-white rounded-[18px] border border-line shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-heading">Kelola Testimoni</h1>
            <p className="text-sm text-muted mt-1">Total {testimonials.length} testimoni aktif</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as any)}
              className="px-4 py-2.5 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
            <Link
              href="/admin/dashboard/testimoni/new"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]"
            >
              <Plus size={18} /> Tambah Testimoni
            </Link>
          </div>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-muted py-8">Belum ada testimoni yang tersedia.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line">
              <thead className="bg-surface">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Avatar</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Nama</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Peran</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Rating</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Layanan</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-surface/50 transition">
                    <td className="px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-accent/10 rounded-xl">
                        <AvatarInitials name={t.name} index={hashCode(t.name)} size={18} className="text-accent" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-heading">{t.name}</td>
                    <td className="px-4 py-3 text-sm text-muted">{t.role || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={star <= t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-line'}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {t.service_type && (
                        <span className="px-2.5 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold capitalize">
                          {t.service_type}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/dashboard/testimoni/${t.id}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-sm font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                        >
                          <Edit size={14} /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(t.id)}
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
        )}
      </div>
    </AdminDashboardLayout>
  );
}

// Simple hash function for avatar color
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}
