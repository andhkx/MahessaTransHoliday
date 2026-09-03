'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Trash2, Plus, Edit, MessageCircle, Search } from 'lucide-react';
import { cn } from '@/lib/cn';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

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
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive' | 'all'>('active');
  const [query, setQuery] = useState('');
  const supabase = createClient();

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('faq_items')
        .select('*')
        .order('group_name')
        .order('display_order');

      if (statusFilter === 'active') query = query.eq('is_active', true);
      if (statusFilter === 'inactive') query = query.eq('is_active', false);
      if (filterGroup !== 'all') query = query.eq('group_name', filterGroup);

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
  }, [filterGroup, statusFilter]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [faqs, query]);

  const toggleActive = async (f: FaqItem) => {
    try {
      const { error } = await supabase
        .from('faq_items')
        .update({ is_active: !f.is_active })
        .eq('id', f.id);
      if (error) throw error;
      await fetchFaqs();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus FAQ ini?')) return;
    try {
      const { error } = await supabase.from('faq_items').delete().eq('id', id);
      if (error) throw error;
      await fetchFaqs();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <AdminDashboardLayout title="FAQ">
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-heading">Kelola FAQ</h1>
            <p className="text-sm text-muted mt-1">
              {statusFilter === 'active'
                ? `${faqs.length} FAQ aktif`
                : statusFilter === 'inactive'
                ? `${faqs.length} FAQ nonaktif`
                : `${faqs.length} total FAQ`}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'active' | 'inactive' | 'all')}
              className="px-4 py-2.5 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
              <option value="all">Semua</option>
            </select>
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value as 'all' | 'main' | 'extra')}
              className="px-4 py-2.5 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              <option value="all">Semua Grup</option>
              <option value="main">Main</option>
              <option value="extra">Extra</option>
            </select>
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari pertanyaan atau jawaban..."
                className="w-full pl-9 pr-3 py-2 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
            <Link
              href="/admin/dashboard/faq/new"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] whitespace-nowrap"
            >
              <Plus size={18} /> Tambah FAQ
            </Link>
          </div>
        </div>

        {loading && <div className="p-8 text-center text-muted">Loading...</div>}
        {error && <div className="p-8 text-center text-error">{error}</div>}

        {faqs.length === 0 && !loading && !error && (
          <p className="text-center text-muted py-8">Belum ada FAQ yang tersedia.</p>
        )}

        {faqs.length > 0 && filtered.length === 0 && !loading && (
          <p className="text-center text-muted py-8">Tidak ada FAQ yang cocok dengan "{query}"</p>
        )}

        {faqs.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-line">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted w-12">#</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Pertanyaan</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Grup</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filtered.map((f) => (
                    <tr key={f.id} className="hover:bg-surface/50 transition">
                      <td className="px-4 py-3 text-sm font-mono text-muted">{f.display_order}</td>
                      <td className="px-4 py-3 text-sm font-bold text-heading max-w-xl truncate">{f.question}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'px-2.5 py-1 rounded-full text-xs font-bold',
                            f.group_name === 'main' ? 'bg-accent/20 text-accent' : 'bg-warning/20 text-warning'
                          )}
                        >
                          {f.group_name === 'main' ? 'Main' : 'Extra'}
                        </span>
                      </td>
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

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
              {filtered.map((f) => (
                <Link
                  key={f.id}
                  href={`/admin/dashboard/faq/${f.id}`}
                  className="block p-4 rounded-xl border border-line bg-white hover:bg-accent/5 hover:border-accent transition"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <MessageCircle size={16} className="text-accent" />
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-[10px] font-bold',
                          f.group_name === 'main' ? 'bg-accent/20 text-accent' : 'bg-warning/20 text-warning'
                        )}
                      >
                        {f.group_name === 'main' ? 'Main' : 'Extra'}
                      </span>
                      <span className="text-xs text-muted font-mono">#{f.display_order}</span>
                    </div>
                    <Edit size={16} className="text-muted flex-shrink-0" />
                  </div>
                  <h3 className="font-bold text-heading mb-1">{f.question}</h3>
                  <p className="text-sm text-body-text line-clamp-2">{f.answer}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminDashboardLayout>
  );
}