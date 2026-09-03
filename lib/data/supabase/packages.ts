import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { TravelPackage, PackageItineraryStep } from '@/lib/types';

const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8F1F5"/><stop offset="1" stop-color="#D9E6EE"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><g fill="#005691" opacity="0.5"><path d="M120 320 L240 200 L560 200 L680 320 L680 360 L120 360 Z"/><circle cx="220" cy="360" r="32"/><circle cx="580" cy="360" r="32"/></g><text x="400" y="430" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="700" fill="#42596B" text-anchor="middle">Foto belum tersedia</text></svg>`
  );

function getPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}

function toArray(value: any): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return [value];
  }
  return [];
}

function parseItinerary(value: any): PackageItineraryStep[] | null {
  if (Array.isArray(value)) return value as PackageItineraryStep[];
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed as PackageItineraryStep[];
    } catch {}
  }
  return null;
}

function mapSupabasePackage(p: any): TravelPackage {
  return {
    id: p.id,
    slug: p.slug,
    destination: p.destination,
    badge: p.badge,
    duration: p.duration_text || `${p.duration_days} Hari`,
    durationHours: p.duration_hours || 0,
    price: p.price,
    image: p.cover_image_url || PLACEHOLDER_IMG,
    description: toArray(p.description),
    included: toArray(p.includes),
    excluded: toArray(p.excluded),
    suitableFor: toArray(p.suitable_for),
    itinerary: parseItinerary(p.itinerary),
    serviceAreas: toArray(p.service_areas).length > 0
      ? toArray(p.service_areas)
      : ['Cimahi', 'Bandung', 'Padalarang'],
    faq: p.faq || [],
    seo: p.seo || {
      title: `Paket ${p.destination} - Mahessa Trans Holiday`,
      description: `Paket perjalanan ke ${p.destination} dengan harga terbaik.`,
      keywords: [],
    },
  };
}

export async function getAllPackages(): Promise<TravelPackage[]> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('is_active', true)
    .order('price');
  if (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
  return (data || []).map(mapSupabasePackage);
}

export async function getFeaturedPackages(): Promise<TravelPackage[]> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('price')
    .limit(4);
  let result: TravelPackage[] = (data || []).map(mapSupabasePackage);
  if (result.length === 0) {
    const { data: fallback } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('price')
      .limit(4);
    result = (fallback || []).map(mapSupabasePackage);
  }
  return result;
}

export async function getPackageBySlug(slug: string): Promise<TravelPackage | null> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  if (error || !data) return null;
  return mapSupabasePackage(data);
}

export async function getRelatedPackages(slug: string, limit = 4): Promise<TravelPackage[]> {
  const supabase = getPublicClient();
  const current = await getPackageBySlug(slug);
  if (!current) {
    const { data } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('price')
      .limit(limit);
    return (data || []).map(mapSupabasePackage);
  }
  const { data } = await supabase
    .from('packages')
    .select('*')
    .eq('is_active', true)
    .neq('slug', slug)
    .eq('destination', current.destination)
    .order('price')
    .limit(limit);
  let results: TravelPackage[] = (data || []).map(mapSupabasePackage);
  if (results.length < limit) {
    const { data: others } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .neq('slug', slug)
      .neq('destination', current.destination)
      .order('price')
      .limit(limit - results.length);
    if (others) results = [...results, ...others.map(mapSupabasePackage)];
  }
  return results.slice(0, limit);
}