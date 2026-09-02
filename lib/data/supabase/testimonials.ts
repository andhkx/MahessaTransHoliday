import { createClient as createSupabaseClient } from '@supabase/supabase-js';

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

export async function getAllTestimonials(): Promise<Testimonial[]> {
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
}

export async function getFeaturedTestimonials(limit = 8): Promise<Testimonial[]> {
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
}