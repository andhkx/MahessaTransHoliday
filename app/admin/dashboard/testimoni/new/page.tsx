'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import AdminForm from '@/components/admin/AdminForm';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

const SERVICE_TYPES = ['rental', 'charter', 'package'] as const;

export default function TestimoniCreate() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [serviceType, setServiceType] = useState<typeof SERVICE_TYPES[number] | ''>('');
  const [displayOrder, setDisplayOrder] = useState('99');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from('testimonials').insert({
        name,
        role: role || null,
        quote,
        rating,
        service_type: serviceType || null,
        display_order: parseInt(displayOrder) || 99,
        is_active: isActive,
      });
      if (error) throw error;
      router.push('/admin/dashboard/testimoni');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => router.push('/admin/dashboard/testimoni');

  return (
    <AdminDashboardLayout title="Tambah Testimoni">
      <AdminForm
        title="Tambah Testimoni Baru"
        description="Tambahkan testimoni dari pelanggan untuk ditampilkan di website."
        onSubmit={handleSave}
        onCancel={handleCancel}
        loading={loading}
        submitText="Simpan Testimoni"
      >
        {error && (
          <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Nama *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="Hendri Wijaya"
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Peran / Keterangan
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="Project Manager, PT X"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Testimoni *
          </label>
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
            placeholder="Perjalanan dinas jadi lebih santai..."
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Rating *
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className="p-1"
                >
                  <Star
                    size={26}
                    className={cn(s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-line')}
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
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value as typeof SERVICE_TYPES[number] | '')}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              <option value="">Pilih tipe</option>
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
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              min={1}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Status Aktif
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 text-accent"
            />
            <span className="text-sm text-heading">Tampilkan di website</span>
          </div>
        </div>
      </AdminForm>
    </AdminDashboardLayout>
  );
}