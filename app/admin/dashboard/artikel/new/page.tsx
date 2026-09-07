'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import AdminForm from '@/components/admin/AdminForm';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

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
  const [is_featured, setIsFeatured] = useState(false);
  const [titleEn, setTitleEn] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
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
        is_featured,
        title_en: titleEn || null,
        excerpt_en: excerptEn || null,
      });

      if (error) throw error;

      router.push('/admin/dashboard/artikel');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => router.push('/admin/dashboard/artikel');

  return (
    <AdminDashboardLayout title="Tulis Artikel Baru">
      <AdminForm
        title="Tulis Artikel Baru"
        description="Buat artikel/blog baru untuk website."
        onSubmit={handleSave}
        onCancel={handleCancel}
        loading={loading}
        submitText="Simpan Artikel"
      >
        {error && (
          <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Judul *
            </label>
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
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Slug
            </label>
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
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Kategori
          </label>
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
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Excerpt (Ringkasan)
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
            placeholder="Ringkasan singkat artikel untuk preview..."
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Konten (Markdown) *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className="w-full px-4 py-3 border border-line rounded-xl text-sm font-mono text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-y font-mono"
            placeholder="# Judul\n\nKonten artikel dalam format Markdown..."
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Meta Title (SEO)
            </label>
            <input
              type="text"
              value={meta_title}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="Untuk SEO, max 60 karakter"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Meta Description (SEO)
            </label>
            <input
              type="text"
              value={meta_description}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="Untuk SEO, max 160 karakter"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Status
            </label>
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

        <div className="flex items-start gap-3 rounded-xl border border-line bg-wa-surface/40 p-4">
          <input
            id="is_featured"
            type="checkbox"
            checked={is_featured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-line text-accent focus:ring-accent"
          />
          <label htmlFor="is_featured" className="flex-1 cursor-pointer">
            <span className="block text-sm font-extrabold text-heading">Tampilkan di Beranda</span>
            <span className="block text-xs leading-relaxed text-muted">
              Centang untuk memunculkan artikel ini di section &quot;Tips &amp; Panduan&quot; di homepage publik. Maks 4 artikel tampil.
            </span>
          </label>
        </div>

        <div className="space-y-4 rounded-xl border border-line bg-wa-surface/40 p-4">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              Versi Bahasa Inggris (Opsional)
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Untuk turis asing. Kosongkan jika artikel hanya untuk pasar Indonesia.
            </p>
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Judul (EN)
            </label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              placeholder="English title (auto-translated to /en landing page later)"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
              Excerpt (EN)
            </label>
            <textarea
              value={excerptEn}
              onChange={(e) => setExcerptEn(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 border border-line rounded-xl text-sm font-bold text-heading outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 resize-none"
              placeholder="Short summary in English..."
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">
            Cover Gambar
          </label>
          <ImageUpload
            bucket="articles"
            onUpload={(url) => setCoverImageUrl(url)}
            currentUrl={cover_image_url}
            label="Cover Artikel"
          />
        </div>
      </AdminForm>
    </AdminDashboardLayout>
  );
}