import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Vehicle } from '@/lib/types';

const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8F1F5"/><stop offset="1" stop-color="#D9E6EE"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><g fill="#005691" opacity="0.5"><circle cx="180" cy="250" r="36"/><rect x="260" y="200" width="280" height="100" rx="14"/><circle cx="620" cy="250" r="36"/></g><text x="400" y="380" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="700" fill="#42596B" text-anchor="middle">Foto belum tersedia</text></svg>`
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
    // Try real JSON array first: '["a","b"]'
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === 'string');
    } catch {}
    // Fallback: split pseudo-JSON-array '{\"a\",\"b\"}' used in seed data
    const pseudo = value.match(/"((?:[^"\\]|\\.)*)"/g);
    if (pseudo && pseudo.length > 0) {
      return pseudo.map((s) => s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\'));
    }
    return [value];
  }
  return [];
}

function mapSupabaseVehicle(v: any): Vehicle {
  // Normalize specs (jsonb column may come as string or array)
  let specs: { label: string; value: string }[] = [];
  if (Array.isArray(v.specs)) {
    specs = v.specs;
  } else if (typeof v.specs === 'string' && v.specs.trim()) {
    try {
      const parsed = JSON.parse(v.specs);
      if (Array.isArray(parsed)) specs = parsed;
    } catch {}
  }

  return {
    id: v.id,
    slug: v.slug,
    name: v.name,
    category: v.category,
    transmission: v.transmission,
    capacity: v.capacity,
    fuelType: v.fuel_type || v.fuel_type_extra || 'Bensin',
    image: v.image_url || PLACEHOLDER_IMG,
    gallery: v.gallery || (v.image_url ? [v.image_url] : []),
    badge: v.badge,
    pricing: { startingPrice: v.price_per_day },
    description: toArray(v.description),
    suitableFor: toArray(v.suitable_for),
    features: toArray(v.features),
    specs,
    serviceAreas: toArray(v.service_areas).length > 0
      ? toArray(v.service_areas)
      : ['Cimahi', 'Bandung', 'Padalarang'],
    seo: v.seo || {
      title: `Rental ${v.name} Cimahi & Bandung`,
      description: `Sewa ${v.name} di Cimahi, Bandung dan Padalarang mulai Rp${v.price_per_day?.toLocaleString()}/ 12 jam.`,
      keywords: [],
    },
  };
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('is_active', true)
    .order('category')
    .order('price_per_day');
  if (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
  return (data || []).map(mapSupabaseVehicle);
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('price_per_day')
    .limit(4);
  let result: Vehicle[] = (data || []).map(mapSupabaseVehicle);
  if (result.length === 0) {
    const { data: fallback } = await supabase
      .from('vehicles')
      .select('*')
      .eq('is_active', true)
      .order('price_per_day')
      .limit(4);
    result = (fallback || []).map(mapSupabaseVehicle);
  }
  return result;
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  if (error) {
    console.error(`[getVehicleBySlug] Error for "${slug}":`, error.message, error.code);
    return null;
  }
  if (!data) {
    console.warn(`[getVehicleBySlug] No data for "${slug}"`);
    return null;
  }
  return mapSupabaseVehicle(data);
}

export async function getRelatedVehicles(slug: string, limit = 4): Promise<Vehicle[]> {
  const supabase = getPublicClient();
  const current = await getVehicleBySlug(slug);
  if (!current) {
    const { data } = await supabase
      .from('vehicles')
      .select('*')
      .eq('is_active', true)
      .order('price_per_day')
      .limit(limit);
    return (data || []).map(mapSupabaseVehicle);
  }
  const { data } = await supabase
    .from('vehicles')
    .select('*')
    .eq('is_active', true)
    .neq('slug', slug)
    .eq('category', current.category)
    .order('price_per_day')
    .limit(limit);
  let results: Vehicle[] = (data || []).map(mapSupabaseVehicle);
  if (results.length < limit) {
    const { data: others } = await supabase
      .from('vehicles')
      .select('*')
      .eq('is_active', true)
      .neq('slug', slug)
      .neq('category', current.category)
      .order('price_per_day')
      .limit(limit - results.length);
    if (others) results = [...results, ...others.map(mapSupabaseVehicle)];
  }
  return results.slice(0, limit);
}