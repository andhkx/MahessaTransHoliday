import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import type { Vehicle } from '@/lib/types';

// Create a PUBLIC client (no cookies) for use in cached server functions.
// This is safe because we only do public read-only queries here.
function getPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

function mapSupabaseVehicle(v: any): Vehicle {
  return {
    id: v.id,
    slug: v.slug,
    name: v.name,
    category: v.category,
    transmission: v.transmission,
    capacity: v.capacity,
    fuelType: v.fuel_type || v.fuel_type_extra || 'Bensin',
    image: v.image_url || '/images/vehicles/placeholder.webp',
    gallery: v.gallery || [v.image_url || '/images/vehicles/placeholder.webp'],
    badge: v.badge,
    pricing: {
      startingPrice: v.price_per_day,
    },
    description: v.description || [],
    suitableFor: v.suitable_for || [],
    features: v.features || [],
    specs: v.specs || [],
    serviceAreas: v.service_areas || ['Cimahi', 'Bandung', 'Padalarang'],
    seo: v.seo || {
      title: `Rental ${v.name} Cimahi & Bandung`,
      description: `Sewa ${v.name} di Cimahi, Bandung dan Padalarang mulai Rp${v.price_per_day?.toLocaleString()}/ 12 jam.`,
      keywords: [],
    },
  };
}

const fetchAllVehicles = unstable_cache(
  async () => {
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
  },
  ['vehicles-all'],
  { revalidate: 60, tags: ['vehicles'] }
);

const fetchFeaturedVehicles = unstable_cache(
  async () => {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('is_active', true)
      .not('badge', 'is', null)
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
  },
  ['vehicles-featured'],
  { revalidate: 60, tags: ['vehicles'] }
);

const fetchVehicleBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const supabase = getPublicClient();
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
      if (error || !data) return null;
      return mapSupabaseVehicle(data);
    },
    [`vehicle-${slug}`],
    { revalidate: 60, tags: [`vehicle-${slug}`, 'vehicles'] }
  )();

const fetchRelatedVehicles = (slug: string, category: string, limit: number) =>
  unstable_cache(
    async () => {
      const supabase = getPublicClient();
      const { data } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_active', true)
        .neq('slug', slug)
        .eq('category', category)
        .order('price_per_day')
        .limit(limit);

      let results: Vehicle[] = (data || []).map(mapSupabaseVehicle);

      if (results.length < limit) {
        const { data: others } = await supabase
          .from('vehicles')
          .select('*')
          .eq('is_active', true)
          .neq('slug', slug)
          .neq('category', category)
          .order('price_per_day')
          .limit(limit - results.length);
        if (others) {
          results = [...results, ...others.map(mapSupabaseVehicle)];
        }
      }
      return results.slice(0, limit);
    },
    [`vehicles-related-${slug}-${category}-${limit}`],
    { revalidate: 60, tags: ['vehicles'] }
  )();

export async function getAllVehicles(): Promise<Vehicle[]> {
  return fetchAllVehicles();
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  return fetchFeaturedVehicles();
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  return fetchVehicleBySlug(slug);
}

export async function getRelatedVehicles(slug: string, limit = 4): Promise<Vehicle[]> {
  const current = await getVehicleBySlug(slug);
  if (!current) {
    return getAllVehicles().then((v) => v.slice(0, limit));
  }
  return fetchRelatedVehicles(slug, current.category, limit);
}