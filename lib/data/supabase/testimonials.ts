import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
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

const fetchAllTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('id,name,role,quote,rating')
      .eq('is_active', true)
      .order('display_order')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
    return data || [];
  },
  ['testimonials-all'],
  { revalidate: 60, tags: ['testimonials'] }
);

const fetchFeaturedTestimonials = unstable_cache(
  async (limit: number): Promise<Testimonial[]> => {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('id,name,role,quote,rating')
      .eq('is_active', true)
      .order('display_order')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) {
      console.error('Error fetching featured testimonials:', error);
      return [];
    }
    return data || [];
  },
  ['testimonials-featured'],
  { revalidate: 60, tags: ['testimonials'] }
);

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return fetchAllTestimonials();
}

export async function getFeaturedTestimonials(limit = 8): Promise<Testimonial[]> {
  return fetchFeaturedTestimonials(limit);
}