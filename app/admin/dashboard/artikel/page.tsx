'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Trash2, Plus, Edit, FileText, Eye } from 'lucide-react';
import { cn } from '@/lib/cn';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

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
  is_featured: boolean;
  created_at: string;
};

const statusStyle = (s: string) =>
  s === 'published' ? 'bg-success/20 text-success' : s === 'draft' ? 'bg-warning/20 text-warning' : 'bg-muted/20 text-muted';
const statusLabel = (s: string) => (s === 'published' ? 'Published' : s === 'draft' ? 'Draft' : 'Archived');

export default function ArtikelList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [filterBeranda, setFilterBeranda] = useState<'all' | 'featured'>('all');
  const [sort, setSort] = useState<'terbaru' | 'judul' | 'views'>('terbaru');
  const [query, setQuery] = useState('');
  const supabase = createClient();

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let q = supabase.from('articles').select('*');
      if (filterStatus !== 'all') q = q.eq('status', filterStatus);
      if (filterBeranda === 'featured') q = q.eq('is_featured', true);
      if (sort === 'terbaru') q = q.order('created_at', { ascending: false });
      else if (sort === 'judul') q = q.order('title', { ascending: true });
      else q = q.order('view_count', { ascending: false });
      const { data, error } = await q;
      if (error) throw error;
      setArticles(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [filterStatus, filterBeranda, sort]);

  const toggleFeatured = async (a: Article) => {
    if (!a.is_featured) {
      const { count } = await supabase.from('articles').select('id', { count: 'exact', head: true }).eq('is_featured', true);
      if ((count ?? 0) >= 10) { alert('Batas beranda penuh (10/10). Nonaktifkan salah satu artikel beranda dulu.'); return; }
    }
    try {
      const { error } = await supabase.from('articles').update({ is_featured: !a.is_featured }).eq('id', a.id);
      if (error) throw error;
      await fetchArticles();
    } catch (err: unknown) { alert(err instanceof Error ? err.message : String(err)); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus artikel ini?')) return;
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
      await fetchArticles();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  const filteredBySearch = (() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(a => a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q) || (a.excerpt||'').toLowerCase().includes(q));
  })();

  return (
    <AdminDashboardLayout title="Artikel">
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-heading">Kelola Artikel</h1>
            <p className="text-sm text-muted mt-1">{filteredBySearch.length} / {articles.length} artikel</p>
          </div>
          <Link
            href="/admin/dashboard/artikel/new"
            className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-extrabold hover:bg-accent-hover transition shadow-[0_8px_20px_-8px_rgba(0,86,145,0.45)] whitespace-nowrap"
          >
            <Plus size={18} /> Tulis Artikel
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="px-3 py-2 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15">
            <option value="all">Semua Status</option><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option>
          </select>
          <div className="flex items-center gap-1.5">
            {(['all','featured'] as const).map(v=>(
              <button key={v} onClick={()=>setFilterBeranda(v)} className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${filterBeranda===v?'bg-accent text-white border-accent':'bg-white text-heading border-line hover:border-accent'}`}>{v==='all'?'Semua':'Beranda'}</button>
            ))}
          </div>
          <select value={sort} onChange={(e)=>setSort(e.target.value as any)} className="px-3 py-2 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15">
            <option value="terbaru">Terbaru</option><option value="judul">Judul A-Z</option><option value="views">Views Tertinggi</option>
          </select>
          <div className="relative flex-1 min-w-[160px]">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari judul/slug..." className="w-full pl-9 pr-3 py-2 border border-line rounded-xl text-sm font-bold text-heading focus:border-accent focus:ring-2 focus:ring-accent/15" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">⌕</span>
          </div>
        </div>

        {loading && <div className="p-8 text-center text-muted">Loading...</div>}
        {error && <div className="p-8 text-center text-error">{error}</div>}

        {filteredBySearch.length === 0 && !loading && !error && (
          <p className="text-center text-muted py-8">Belum ada artikel. {query ? `Tidak ada yang cocok "${query}"` : ''}</p>
        )}

        {filteredBySearch.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-line">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Cover</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Judul</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Kategori</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Status</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Tgl Publish</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Beranda</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Views</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filteredBySearch.map((a) => (
                    <tr key={a.id} className="hover:bg-surface/50 transition">
                      <td className="px-4 py-3">
                        {a.cover_image_url ? (
                          <img src={a.cover_image_url} alt="" className="h-12 w-16 object-cover rounded-xl" />
                        ) : (
                          <div className="h-12 w-16 bg-surface rounded-xl flex items-center justify-center">
                            <FileText size={16} className="text-muted" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 flex-wrap"><span className="text-sm font-bold text-heading max-w-xs truncate">{a.title}</span>{a.is_featured && <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold">Beranda</span>}</div>
                        <p className="text-xs text-muted font-mono mt-0.5">{a.slug}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold capitalize">
                          {a.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusStyle(a.status)}`}>
                          {statusLabel(a.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">
                        {a.published_at ? new Date(a.published_at).toLocaleDateString('id-ID') : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => toggleFeatured(a)} className="cursor-pointer" title={a.is_featured ? 'Hapus dari beranda' : 'Tampilkan di beranda'}>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${a.is_featured ? 'bg-primary/15 text-primary' : 'bg-muted/15 text-muted'}`}>{a.is_featured ? 'Beranda' : '—'}</span>
                        </button>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{a.view_count}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/dashboard/artikel/${a.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line text-sm font-medium text-heading hover:bg-accent/10 hover:border-accent transition"
                          >
                            <Edit size={14} /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(a.id)}
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
              {filteredBySearch.map((a) => (
                <Link
                  key={a.id}
                  href={`/admin/dashboard/artikel/${a.id}`}
                  className="block p-4 rounded-xl border border-line bg-white hover:bg-accent/5 hover:border-accent transition"
                >
                  <div className="flex items-start gap-3">
                    {a.cover_image_url ? (
                      <img src={a.cover_image_url} alt="" className="h-16 w-20 object-cover rounded-xl flex-shrink-0" />
                    ) : (
                      <div className="h-16 w-20 bg-surface rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText size={20} className="text-muted" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-heading truncate">{a.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle(a.status)}`}>
                          {statusLabel(a.status)}
                        </span>
                      </div>
                      <p className="text-xs text-muted font-mono truncate">{a.slug}</p>
                      <p className="text-xs text-muted mt-1">{a.category} • {a.view_count} views</p>
                      {a.excerpt && <p className="text-sm text-body-text line-clamp-2 mt-1">{a.excerpt}</p>}
                    </div>
                    <Edit size={16} className="text-muted flex-shrink-0" />
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