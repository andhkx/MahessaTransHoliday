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

const IMAGE_CACHE_TTL = 5 * 60 * 1000;

const imageCache = new Map<string, { url: string; ts: number }>();

const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8F1F5"/><stop offset="1" stop-color="#D9E6EE"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><g fill="#005691" opacity="0.4"><circle cx="200" cy="250" r="36"/><rect x="280" y="200" width="240" height="100" rx="14"/><circle cx="600" cy="250" r="36"/></g><text x="400" y="380" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="700" fill="#42596B" text-anchor="middle">Foto belum tersedia</text></svg>`
  );

export async function getVehicleImage(slug: string, fallback = FALLBACK_IMG): Promise<string> {
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

export async function getFeaturedVehicleImageUrl(): Promise<string> {
  return getVehicleImage('toyota-hiace-premio');
}