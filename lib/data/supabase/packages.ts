import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import type { TravelPackage, PackageItineraryStep } from '@/lib/types';

function getPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
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
    image: p.cover_image_url || '/images/packages/placeholder.webp',
    description: p.description || [],
    included: p.includes || [],
    excluded: p.excluded || [],
    suitableFor: p.suitable_for || [],
    itinerary: (p.itinerary as PackageItineraryStep[]) || null,
    serviceAreas: p.service_areas || ['Cimahi', 'Bandung', 'Padalarang'],
    faq: p.faq || [],
    seo: p.seo || {
      title: `Paket ${p.destination} - Mahessa Trans Holiday`,
      description: `Paket perjalanan ke ${p.destination} dengan harga terbaik.`,
      keywords: [],
    },
  };
}

const fetchAllPackages = unstable_cache(
  async () => {
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
  },
  ['packages-all'],
  { revalidate: 60, tags: ['packages'] }
);

const fetchFeaturedPackages = unstable_cache(
  async () => {
    const supabase = getPublicClient();
    const { data } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .not('badge', 'is', null)
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
  },
  ['packages-featured'],
  { revalidate: 60, tags: ['packages'] }
);

const fetchPackageBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      const supabase = getPublicClient();
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
      if (error || !data) return null;
      return mapSupabasePackage(data);
    },
    [`package-${slug}`],
    { revalidate: 60, tags: [`package-${slug}`, 'packages'] }
  )();

const fetchRelatedPackages = (slug: string, destination: string, limit: number) =>
  unstable_cache(
    async () => {
      const supabase = getPublicClient();
      const { data } = await supabase
        .from('packages')
        .select('*')
        .eq('is_active', true)
        .neq('slug', slug)
        .eq('destination', destination)
        .order('price')
        .limit(limit);

      let results: TravelPackage[] = (data || []).map(mapSupabasePackage);

      if (results.length < limit) {
        const { data: others } = await supabase
          .from('packages')
          .select('*')
          .eq('is_active', true)
          .neq('slug', slug)
          .neq('destination', destination)
          .order('price')
          .limit(limit - results.length);
        if (others) {
          results = [...results, ...others.map(mapSupabasePackage)];
        }
      }
      return results.slice(0, limit);
    },
    [`packages-related-${slug}-${destination}-${limit}`],
    { revalidate: 60, tags: ['packages'] }
  )();

export async function getAllPackages(): Promise<TravelPackage[]> {
  return fetchAllPackages();
}

export async function getFeaturedPackages(): Promise<TravelPackage[]> {
  return fetchFeaturedPackages();
}

export async function getPackageBySlug(slug: string): Promise<TravelPackage | null> {
  return fetchPackageBySlug(slug);
}

export async function getRelatedPackages(slug: string, limit = 4): Promise<TravelPackage[]> {
  const current = await getPackageBySlug(slug);
  if (!current) {
    return getAllPackages().then((p) => p.slice(0, limit));
  }
  return fetchRelatedPackages(slug, current.destination, limit);
}