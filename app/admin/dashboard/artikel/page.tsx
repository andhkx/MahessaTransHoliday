'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Trash2, Plus, Edit, FileText, Eye } from 'lucide-react';
import AdminDashboardLayout from '@/app/admin/dashboard/layout';

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: 'draft' | 'published' | 'archived';
  category: string;
  view_count: number;
  published_at: string | null;
  cover_image_url: string | null;
};

export default function ArtikelList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const supabase = createClient();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let query = supabase.from('articles').select('*').order('created_at', { ascending: false });
      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }
      const { data, error } = await query;
      if (error) throw error;
      setArticles(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus artikel ini?')) return;
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
      await fetchArticles();
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
          <h1 className="text-2xl font-extrabold text-heading">Artikel</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard/artikel/new"
              className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl font-extrabold hover:bg-accent-hover transition"
            >
              <Plus size={18} /> Tulis Artikel
            </Link>
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'draft' | 'published' | 'archived')}
                className="w-full px-4 py-2 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                <option value="all">Semua</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {articles.length === 0 ? (
          <p className="text-center text-muted py-8">Belum ada artikel yang tersedia.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line">
              <thead className="bg-surface">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Cover</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Judul</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Tgl Publish</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {articles.map((a) => (
                  <tr key={a.id} className="hover:bg-surface/50">
                    <td className="px-6 py-4">
                      {a.cover_image_url ? (
                        <img src={a.cover_image_url} alt="" className="h-12 w-12 object-cover rounded" />
                      ) : (
                        <div className="h-12 w-12 bg-surface rounded flex items-center justify-center">
                          <FileText size={16} className="text-muted" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-heading max-w-xs truncate">{a.title}</td>
                    <td className="px-6 py-4 text-sm text-muted">{a.category}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        a.status === 'published' ? 'bg-success/20 text-success' :
                        a.status === 'draft' ? 'bg-warning/20 text-warning' :
                        'bg-muted/20 text-muted'
                      }`}>
                        {a.status === 'published' ? 'Published' : a.status === 'draft' ? 'Draft' : 'Archived'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {a.published_at ? new Date(a.published_at).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">{a.view_count}</td>
                    <td className="px-6 py-4 text-sm flex space-x-2">
                      <Link
                        href={`/admin/dashboard/artikel/${a.id}`}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-border border border-line text-sm font-medium text-heading hover:bg-accent/10"
                      >
                        <Edit size={16} /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(a.id)}
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
