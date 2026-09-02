import { createClient } from '@/lib/supabase/server';
import type { FaqItem } from '@/lib/types';

async function getClient() {
  return await createClient();
}

function mapSupabaseFaq(f: any): FaqItem {
  return {
    id: f.id,
    question: f.question,
    answer: f.answer,
  };
}

export async function getAllFaqs(): Promise<FaqItem[]> {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .eq('is_active', true)
    .order('group_name')
    .order('display_order');

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return (data || []).map(mapSupabaseFaq);
}

export async function getMainFaqs(): Promise<FaqItem[]> {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .eq('is_active', true)
    .eq('group_name', 'main')
    .order('display_order');

  if (error) {
    console.error('Error fetching main FAQs:', error);
    return [];
  }

  return (data || []).map(mapSupabaseFaq);
}

export async function getExtraFaqs(): Promise<FaqItem[]> {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .eq('is_active', true)
    .eq('group_name', 'extra')
    .order('display_order');

  if (error) {
    console.error('Error fetching extra FAQs:', error);
    return [];
  }

  return (data || []).map(mapSupabaseFaq);
}