'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Check } from 'lucide-react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  group_name: string;
  display_order: number;
  is_active: boolean;
};

export default function FaqEdit() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const [faq, setFaq] = useState<FaqItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const loadFaq = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('faq_items').select('*').eq('id', id).single();
      if (error) throw error;
      if (!data) {
        router.push('/admin/dashboard/faq');
        return;
      }
      setFaq(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faq) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const { error } = await supabase.from('faq_items').update({
        question: faq.question,
        answer: faq.answer,
        group_name: faq.group_name,
        display_order: faq.display_order,
        is_active: faq.is_active,
        updated_at: new Date().toISOString(),
      }).eq('id', id);
      if (error) throw error;
      setSuccess(true);
      setTimeout(() => router.push('/admin/dashboard/faq'), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-muted">Loading...</div>;
  if (error) return <div className="p-8 text-center text-error">{error}</div>;
  if (!faq) return null;

  return (
    <AdminDashboardLayout title={`Edit FAQ`}>
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

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Pertanyaan *
            </label>
            <input
              type="text"
              value={faq.question}
              onChange={(e) => setFaq({ ...faq, question: e.target.value })}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Jawaban *
            </label>
            <textarea
              value={faq.answer}
              onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Grup
              </label>
              <select
                value={faq.group_name}
                onChange={(e) => setFaq({ ...faq, group_name: e.target.value as 'main' | 'extra' })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                <option value="main">Main (ditampilkan utama)</option>
                <option value="extra">Extra (FAQ tambahan)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Urutan
              </label>
              <input
                type="number"
                value={faq.display_order}
                onChange={(e) => setFaq({ ...faq, display_order: parseInt(e.target.value) || 99 })}
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
              checked={faq.is_active}
              onChange={(e) => setFaq({ ...faq, is_active: e.target.checked })}
              className="h-4 w-4 text-accent"
            />
            <span className="text-sm text-heading">Tampilkan di website</span>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard/faq')}
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