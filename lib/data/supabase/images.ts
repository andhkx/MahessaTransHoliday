import { createClient as createSupabaseClient } from '@supabase/supabase-js';

function getPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}

const IMAGE_CACHE_TTL = 5 * 60 * 1000; // 5 min cache in memory

const imageCache = new Map<string, { url: string; ts: number }>();

export async function getVehicleImage(slug: string, fallback = '/images/vehicles/placeholder.webp'): Promise<string> {
  const cached = imageCache.get(slug);
  if (cached && Date.now() - cached.ts < IMAGE_CACHE_TTL) return cached.url;
  if (cached && Date.now() - cached.ts >= IMAGE_CACHE_TTL) imageCache.delete(slug);

  const supabase = getPublicClient();
  const { data } = await supabase
    .from('vehicles')
    .select('image_url')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  const url = data?.image_url || fallback;
  imageCache.set(slug, { url, ts: Date.now() });
  return url;
}

export async function getFeaturedVehicleImageUrl(fallback = '/images/vehicles/toyota-hiace-premio.webp'): Promise<string> {
  return getVehicleImage('toyota-hiace-premio', fallback);
}