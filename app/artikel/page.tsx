'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/cn';

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: string;
  published_at: string | null;
  view_count: number;
};

export default function ArtikelList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (error) throw error;
      setArticles(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-error">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-extrabold text-heading mb-8">Artikel Terbaru</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/artikel/${a.slug}`}
            className="group border rounded-[16px] overflow-hidden bg-white shadow-card hover:shadow-elevated transition-shadow"
          >
            {a.cover_image_url ? (
              <Image
                src={a.cover_image_url}
                alt={a.title}
                width={600}
                height={400}
                fill
                className="aspect-[16/10] object-cover"
              />
            ) : (
              <div
                className="h-48 bg-surface rounded flex items-center justify-center text-muted text-sm"
              >
                <FileText size={24} />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-baseline gap-2">
                <h3 className="font-bold text-heading hover:text-accent transition">{a.title}</h3>
                {a.category ? (
                  <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${cn('bg-' + a.category.split('-')[0], 'bg-surface/20', 'text-muted')}`}>
                    {a.category}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-muted line-clamp-2">{a.excerpt}</p>
              <p className="mt-2 text-xs text-muted">
                {a.published_at ? new Date(a.published_at).toLocaleDateString('id-ID') : '-'} • {a.view_count} views
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}