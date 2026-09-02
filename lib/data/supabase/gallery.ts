import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

export type GalleryItem = {
  id: string;
  caption: string;
  image_url: string;
  category: string;
  location: string | null;
  display_order: number;
  is_active: boolean;
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

const fetchAllGallery = unstable_cache(
  async (): Promise<GalleryItem[]> => {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('gallery_items')
      .select('id,caption,image_url,category,location,display_order,is_active')
      .eq('is_active', true)
      .order('display_order')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
    return data || [];
  },
  ['gallery-all'],
  { revalidate: 60, tags: ['gallery'] }
);

const fetchFeaturedGallery = (limit: number) =>
  unstable_cache(
    async (): Promise<GalleryItem[]> => {
      const supabase = getPublicClient();
      const { data, error } = await supabase
        .from('gallery_items')
        .select('id,caption,image_url,category,location,display_order,is_active')
        .eq('is_active', true)
        .order('display_order')
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) {
        console.error('Error fetching featured gallery:', error);
        return [];
      }
      return data || [];
    },
    [`gallery-featured-${limit}`],
    { revalidate: 60, tags: ['gallery'] }
  )();

const fetchGalleryByCategory = (category: string) =>
  unstable_cache(
    async (): Promise<GalleryItem[]> => {
      const supabase = getPublicClient();
      const { data, error } = await supabase
        .from('gallery_items')
        .select('id,caption,image_url,category,location,display_order,is_active')
        .eq('is_active', true)
        .eq('category', category)
        .order('display_order')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching gallery by category:', error);
        return [];
      }
      return data || [];
    },
    [`gallery-category-${category}`],
    { revalidate: 60, tags: ['gallery'] }
  )();

export async function getAllGallery(): Promise<GalleryItem[]> {
  return fetchAllGallery();
}

export async function getFeaturedGallery(limit = 5): Promise<GalleryItem[]> {
  return fetchFeaturedGallery(limit);
}

export async function getGalleryByCategory(category: string): Promise<GalleryItem[]> {
  return fetchGalleryByCategory(category);
}