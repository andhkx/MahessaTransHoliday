'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Star, Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

const SERVICE_TYPES = ['rental', 'charter', 'package'] as const;

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number;
  service_type: string | null;
  display_order: number;
  is_active: boolean;
};

export default function TestimoniEdit() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const loadTestimonial = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('testimonials').select('*').eq('id', id).single();
      if (error) throw error;
      if (!data) {
        router.push('/admin/dashboard/testimoni');
        return;
      }
      setTestimonial(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      router.push('/admin/dashboard/testimoni');
      return;
    }
    loadTestimonial();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonial) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const { error } = await supabase.from('testimonials').update({
        name: testimonial.name,
        role: testimonial.role,
        quote: testimonial.quote,
        rating: testimonial.rating,
        service_type: testimonial.service_type,
        display_order: testimonial.display_order,
        is_active: testimonial.is_active,
        updated_at: new Date().toISOString(),
      }).eq('id', id);
      if (error) throw error;
      setSuccess(true);
      setTimeout(() => router.push('/admin/dashboard/testimoni'), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-muted">Loading...</div>;
  if (error) return <div className="p-8 text-center text-error">{error}</div>;
  if (!testimonial) return null;

  return (
    <AdminDashboardLayout title={`Edit: ${testimonial.name}`}>
      <div className="bg-white rounded-[18px] border border-line shadow-card p-6 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          {error && (
            <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-success/10 border border-success/30 text-success p-4 rounded-xl flex items-center gap-2">
              <Check size={16} /> Perubahan disimpan
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Nama *
              </label>
              <input
                type="text"
                value={testimonial.name}
                onChange={(e) => setTestimonial({ ...testimonial, name: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Peran
              </label>
              <input
                type="text"
                value={testimonial.role || ''}
                onChange={(e) => setTestimonial({ ...testimonial, role: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Testimoni *
            </label>
            <textarea
              value={testimonial.quote}
              onChange={(e) => setTestimonial({ ...testimonial, quote: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setTestimonial({ ...testimonial, rating: s })}
                    className="p-1"
                  >
                    <Star
                      size={26}
                      className={cn(s <= testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-line')}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Tipe Layanan
              </label>
              <select
                value={testimonial.service_type || ''}
                onChange={(e) => setTestimonial({ ...testimonial, service_type: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                <option value="">Tidak ada</option>
                {SERVICE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t === 'rental' ? 'Rental' : t === 'charter' ? 'Charter' : 'Paket'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Urutan
              </label>
              <input
                type="number"
                value={testimonial.display_order}
                onChange={(e) => setTestimonial({ ...testimonial, display_order: parseInt(e.target.value) || 99 })}
                min={1}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Status Aktif
            </label>
            <input
              type="checkbox"
              checked={testimonial.is_active}
              onChange={(e) => setTestimonial({ ...testimonial, is_active: e.target.checked })}
              className="h-4 w-4 text-accent"
            />
            <span className="text-sm text-heading">Tampilkan di website</span>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard/testimoni')}
              className="px-5 py-2.5 border border-line rounded-xl text-sm font-medium text-heading hover:bg-surface/50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-accent text-white font-extrabold rounded-xl hover:bg-accent-hover disabled:opacity-50 shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] transition"
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </AdminDashboardLayout>
  );
}