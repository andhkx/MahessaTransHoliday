import { createClient } from '@/lib/supabase/server';
import type { Vehicle } from '@/lib/types';

async function getClient() {
  return await createClient();
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

export async function getAllVehicles(): Promise<Vehicle[]> {
  const supabase = await getClient();
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
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('is_active', true)
    .order('price_per_day')
    .limit(4);

  if (error) {
    console.error('Error fetching featured vehicles:', error);
    return [];
  }

  return (data || []).map(mapSupabaseVehicle);
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    return null;
  }

  return mapSupabaseVehicle(data);
}

export async function getRelatedVehicles(slug: string, limit = 4): Promise<Vehicle[]> {
  const current = await getVehicleBySlug(slug);
  const supabase = await getClient();

  if (!current) {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('is_active', true)
      .order('price_per_day')
      .limit(limit);
    if (error) return [];
    return (data || []).map(mapSupabaseVehicle);
  }

  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('is_active', true)
    .neq('slug', slug)
    .eq('category', current.category)
    .order('price_per_day')
    .limit(limit);

  let results = (data || []).map(mapSupabaseVehicle);

  if (results.length < limit) {
    const { data: others } = await supabase
      .from('vehicles')
      .select('*')
      .eq('is_active', true)
      .neq('slug', slug)
      .neq('category', current.category)
      .order('price_per_day')
      .limit(limit - results.length);

    if (others) {
      results = [...results, ...others.map(mapSupabaseVehicle)];
    }
  }

  return results.slice(0, limit);
}