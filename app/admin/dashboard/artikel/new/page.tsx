'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import { X } from 'lucide-react';

const CATEGORIES = ['tips', 'destinasi', 'panduan', 'berita'] as const;

export default function ArtikelCreate() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'tips' | 'destinasi' | 'panduan' | 'berita'>('tips');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [meta_title, setMetaTitle] = useState('');
  const [meta_description, setMetaDescription] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [published_at, setPublishedAt] = useState('');
  const [cover_image_url, setCoverImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from('articles').insert({
        title,
        slug,
        category,
        excerpt,
        content,
        meta_title,
        meta_description,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
        cover_image_url,
      });

      if (error) throw error;

      router.push('/admin/dashboard/artikel');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => router.push('/admin/dashboard/artikel');

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white shadow-sm border-b border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
          <Link href="/admin/dashboard/artikel" className="flex items-center gap-3">
            <X size={20} className="text-muted" />
            <span className="text-sm font-medium text-heading">Artikel</span>
          </Link>
          <h1 className="text-xl font-extrabold text-heading">Tulis Artikel Baru</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8">
        <form onSubmit={handleSave} className="bg-white rounded-[24px] border border-line shadow-card p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Judul *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  const value = e.target.value;
                  setTitle(value);
                  const generatedSlug = value
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-');
                  setSlug(generatedSlug);
                }}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="Tips Perjalanan Nyaman ke Bandung"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="tips-perjalanan-nyaman-ke-bandung"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Excerpt (Ringkasan)</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
              placeholder="Ringkasan singkat artikel untuk preview..."
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Konten (Markdown)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-mono text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-y font-mono"
              placeholder="# Judul\n\nKonten artikel dalam format Markdown..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Meta Title (SEO)</label>
              <input
                type="text"
                value={meta_title}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="Untuk SEO, max 60 karakter"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Meta Description (SEO)</label>
              <input
                type="text"
                value={meta_description}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                placeholder="Untuk SEO, max 160 karakter"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
                Tanggal Publish
              </label>
              <input
                type="datetime-local"
                value={published_at}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Cover</label>
            <ImageUpload
              bucket="articles"
              onUpload={(url) => setCoverImageUrl(url)}
              currentUrl={cover_image_url}
              label="Cover Artikel"
            />
          </div>

          <div className="flex justify-end pt-4 space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 border border-line rounded-xl text-sm font-medium text-heading hover:bg-surface/50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-accent text-white font-extrabold rounded-xl hover:bg-accent-hover disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Artikel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}