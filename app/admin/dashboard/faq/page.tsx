'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Trash2, Plus, Edit, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import AdminDashboardLayout from '@/app/admin/dashboard/layout';

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  group_name: string;
  display_order: number;
  is_active: boolean;
};

export default function FaqList() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterGroup, setFilterGroup] = useState<'all' | 'main' | 'extra'>('all');
  const supabase = createClient();

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('faq_items')
        .select('*')
        .eq('is_active', true)
        .order('group_name')
        .order('display_order');

      if (filterGroup !== 'all') {
        query = query.eq('group_name', filterGroup);
      }

      const { data, error } = await query;
      if (error) throw error;
      setFaqs(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [filterGroup]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus FAQ ini?')) return;
    try {
      const { error } = await supabase
        .from('faq_items')
        .update({ is_active: false })
        .eq('id', id);
      if (error) throw error;
      await fetchFaqs();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <AdminDashboardLayout title="FAQ">
      <div className="bg-white rounded-[18px] border border-line shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-heading">Kelola FAQ</h1>
            <p className="text-sm text-muted mt-1">Total {faqs.length} pertanyaan aktif</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value as 'all' | 'main' | 'extra')}
              className="px-4 py-2.5 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              <option value="all">Semua Grup</option>
              <option value="main">Main (6)</option>
              <option value="extra">Extra (7)</option>
            </select>
            <Link
              href="/admin/dashboard/faq/new"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)]"
            >
              <Plus size={18} /> Tambah FAQ
            </Link>
          </div>
        </div>

        {loading && <div className="p-8 text-center text-muted">Loading...</div>}
        {error && <div className="p-8 text-error">{error}</div>}

        {faqs.length === 0 && !loading && !error && (
          <p className="text-center text-muted py-8">Belum ada FAQ yang tersedia.</p>
        )}

        {faqs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line">
              <thead className="bg-surface">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">#</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Pertanyaan</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Grup</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Urutan</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {faqs.map((f) => (
                  <tr key={f.id} className="hover:bg-surface/50 transition">
                    <td className="px-4 py-3 text-sm font-mono text-muted">{f.display_order}</td>
                    <td className="px-4 py-3 text-sm font-bold text-heading max-w-xl truncate">{f.question}</td>
                    <td className="px-4 py-3">
                      <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold',
                        f.group_name === 'main' ? 'bg-accent/20 text-accent' : 'bg-warning/20 text-warning'
                      )}>
                        {f.group_name === 'main' ? 'Main' : 'Extra'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted">{f.display_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/dashboard/faq/${f.id}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-sm font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                        >
                          <Edit size={14} /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(f.id)}
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
