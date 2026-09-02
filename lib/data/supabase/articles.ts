import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  category: string | null;
  status: 'draft' | 'published' | 'archived';
  view_count: number;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
};

function getPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}

const fetchAllArticles = unstable_cache(
  async (): Promise<Article[]> => {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
    return data || [];
  },
  ['articles-all'],
  { revalidate: 60, tags: ['articles'] }
);

const fetchArticleBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<Article | null> => {
      const supabase = getPublicClient();
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      if (error || !data) return null;
      return data;
    },
    [`article-${slug}`],
    { revalidate: 60, tags: [`article-${slug}`, 'articles'] }
  )();

const fetchLatestArticles = (limit: number) =>
  unstable_cache(
    async (): Promise<Article[]> => {
      const supabase = getPublicClient();
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);
      if (error) {
        console.error('Error fetching latest articles:', error);
        return [];
      }
      return data || [];
    },
    [`articles-latest-${limit}`],
    { revalidate: 60, tags: ['articles'] }
  )();

export async function getAllArticles(): Promise<Article[]> {
  return fetchAllArticles();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return fetchArticleBySlug(slug);
}

export async function getLatestArticles(limit = 6): Promise<Article[]> {
  return fetchLatestArticles(limit);
}