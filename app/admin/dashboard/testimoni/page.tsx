'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Trash2, Plus, Edit, Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

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

  return (
    <AdminDashboardLayout title="Testimoni Pelanggan">
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-heading">Kelola Testimoni</h1>
            <p className="text-sm text-muted mt-1">Total {testimonials.length} testimoni aktif</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2.5 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15 w-full sm:w-auto"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
            <Link
              href="/admin/dashboard/testimoni/new"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] whitespace-nowrap"
            >
              <Plus size={18} /> Tambah Testimoni
            </Link>
          </div>
        </div>

        {loading && <div className="p-8 text-center text-muted">Loading...</div>}
        {error && <div className="p-8 text-center text-error">{error}</div>}

        {testimonials.length === 0 && !loading && !error && (
          <p className="text-center text-muted py-8">Belum ada testimoni yang tersedia.</p>
        )}

        {testimonials.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-line">
                <thead className="bg-surface">
                  <tr>
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
                        <div className="text-sm font-bold text-heading">{t.name}</div>
                        <p className="text-xs text-muted line-clamp-1 max-w-md">{t.quote}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{t.role || '-'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
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

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
              {testimonials.map((t) => (
                <Link
                  key={t.id}
                  href={`/admin/dashboard/testimoni/${t.id}`}
                  className="block p-4 rounded-xl border border-line bg-white hover:bg-accent/5 hover:border-accent transition"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-heading truncate">{t.name}</h3>
                      <p className="text-xs text-muted truncate">{t.role || '-'}</p>
                    </div>
                    <Edit size={16} className="text-muted flex-shrink-0" />
                  </div>
                  <p className="text-sm text-body-text line-clamp-2 mb-3 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={star <= t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-line'}
                        />
                      ))}
                    </div>
                    {t.service_type && (
                      <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-bold capitalize">
                        {t.service_type}
                      </span>
                    )}
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