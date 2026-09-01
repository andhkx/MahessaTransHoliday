'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import AdminDashboardLayout from '@/app/admin/dashboard/layout';

export default function FaqCreate() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [groupName, setGroupName] = useState<'main' | 'extra'>('main');
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
      const { error } = await supabase.from('faq_items').insert({
        question,
        answer,
        group_name: groupName,
        display_order: parseInt(displayOrder) || 99,
        is_active: isActive,
      });
      if (error) throw error;
      router.push('/admin/dashboard/faq');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => router.push('/admin/dashboard/faq');

  return (
    <AdminDashboardLayout title="Tambah FAQ">
      <div className="bg-white rounded-[18px] border border-line shadow-card p-6 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          {error && (
            <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Pertanyaan *
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="Apakah semua mobil bisa dengan driver?"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Jawaban *
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
              placeholder="Ya, semua unit di armada kami dapat disewa dengan driver profesional."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Grup *
              </label>
              <select
                value={groupName}
                onChange={(e) => setGroupName(e.target.value as 'main' | 'extra')}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                <option value="main">Main (ditampilkan utama)</option>
                <option value="extra">Extra (FAQ tambahan)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Urutan Tampil
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                min={1}
                max={99}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
              <p className="text-xs text-muted mt-1">Angka lebih kecil tampil lebih dulu</p>
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

          <div className="flex justify-end pt-4 space-x-3 border-t border-line">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 border border-line rounded-xl text-sm font-medium text-heading hover:bg-surface/50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-accent text-white font-extrabold rounded-xl hover:bg-accent-hover transition disabled:opacity-50 shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]"
            >
              {loading ? 'Menyimpan...' : 'Simpan FAQ'}
            </button>
          </div>
        </form>
      </div>
    </AdminDashboardLayout>
  );
}
