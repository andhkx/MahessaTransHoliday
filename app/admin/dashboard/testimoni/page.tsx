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

  useEffect(() => {
    fetchTestimonials();
  }, []);

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus testimoni ini?')) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      await fetchTestimonials();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-error">{error}</div>;

  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-heading">Testimoni Pelanggan</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard/testimoni/new"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl font-extrabold hover:bg-accent-hover transition"
            >
              <Plus size={18} /> Tambah Testimoni
            </Link>
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-1">
                Status
              </label>
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value as any)}
                className="w-full px-4 py-2 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                <option value="all">Semua</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>
          </div>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-muted py-8">Belum ada testimoni yang tersedia.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line">
              <thead className="bg-surface">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Foto</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Peran</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Layanan</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-surface/50">
                    <td className="px-6 py-4">
                      <div className="flex h-12 w-12 items-center justify-center bg-surface rounded">
                        <AvatarInitials name={t.name} index={hashCode(t.name)} size={24} className="text-white" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-heading">{t.name}</td>
                    <td className="px-6 py-4 text-sm text-muted">{t.role || '-'}</td>
                    <td className="px-6 py-4 text-sm flex items-center gap-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-line'}
                        />
                      ))}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">{t.service_type || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${t.is_active ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                        {t.is_active ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex space-x-2">
                      <Link
                        href={`/admin/dashboard/testimoni/${t.id}`}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-border border border-line text-sm font-medium text-heading hover:bg-accent/10"
                      >
                        <Edit size={16} /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(t.id)}
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