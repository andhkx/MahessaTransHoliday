import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Vehicle } from '@/lib/types';

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
    image: v.image_url || '/images/vehicles/placeholder.webp',
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