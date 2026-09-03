'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ImageUpload from '@/components/admin/ImageUpload';
import { Check } from 'lucide-react';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

const CATEGORIES = ['tips', 'destinasi', 'panduan', 'berita'] as const;

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  status: 'draft' | 'published' | 'archived';
  meta_title: string | null;
  meta_description: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

export default function ArtikelEdit() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!id) {
      router.push('/admin/dashboard/artikel');
      return;
    }
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      if (!data) {
        router.push('/admin/dashboard/artikel');
        return;
      }
      setArticle(data as Article);
      setCoverImageUrl(data.cover_image_url ?? null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const wasPublished = article.status === 'published';
      const nowPublished = wasPublished;
      const { error } = await supabase
        .from('articles')
        .update({
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          status: article.status,
          meta_title: article.meta_title,
          meta_description: article.meta_description,
          cover_image_url: coverImageUrl,
          published_at: nowPublished ? article.published_at || new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
      if (error) throw error;
      setSuccess(true);
      setTimeout(() => router.push('/admin/dashboard/artikel'), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <AdminDashboardLayout title="Edit Artikel">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-3 border-accent border-t-transparent mx-auto" />
          <p className="text-muted text-sm mt-3">Memuat...</p>
        </div>
      </AdminDashboardLayout>
    );

  if (error && !article)
    return (
      <AdminDashboardLayout title="Edit Artikel">
        <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl m-6">
          {error}
        </div>
      </AdminDashboardLayout>
    );

  if (!article) return null;

  return (
    <AdminDashboardLayout
      eyebrow="Artikel"
      title={`Edit: ${article.title}`}
      subtitle="Ubah detail artikel."
    >
      <div className="bg-white rounded-2xl border border-line shadow-card p-4 sm:p-6 max-w-4xl">
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
                Judul *
              </label>
              <input
                type="text"
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={article.slug}
                onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Kategori
              </label>
              <select
                value={article.category}
                onChange={(e) => setArticle({ ...article, category: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Status
              </label>
              <select
                value={article.status}
                onChange={(e) =>
                  setArticle({ ...article, status: e.target.value as Article['status'] })
                }
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Excerpt
            </label>
            <textarea
              value={article.excerpt || ''}
              onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Konten *
            </label>
            <textarea
              value={article.content || ''}
              onChange={(e) => setArticle({ ...article, content: e.target.value })}
              rows={10}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Cover
            </label>
            <ImageUpload
              bucket="articles"
              onUpload={(url) => setCoverImageUrl(url || null)}
              currentUrl={coverImageUrl}
              label="Cover Artikel"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-line">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Meta Title (SEO)
              </label>
              <input
                type="text"
                value={article.meta_title || ''}
                onChange={(e) => setArticle({ ...article, meta_title: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Meta Description (SEO)
              </label>
              <input
                type="text"
                value={article.meta_description || ''}
                onChange={(e) => setArticle({ ...article, meta_description: e.target.value })}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard/artikel')}
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