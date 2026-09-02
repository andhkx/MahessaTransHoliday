import { createClient as createSupabaseClient } from '@supabase/supabase-js';

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

export async function getAllGallery(): Promise<GalleryItem[]> {
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
}

export async function getFeaturedGallery(limit = 5): Promise<GalleryItem[]> {
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
}

export async function getGalleryByCategory(category: string): Promise<GalleryItem[]> {
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
}