import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export type ActivityLog = {
  id: string;
  user_email: string | null;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  description: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

function getClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

export async function getRecentActivity(limit = 10): Promise<ActivityLog[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('activity_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('[getRecentActivity]', error);
    return [];
  }
  return (data || []) as ActivityLog[];
}

export async function getActivityLog(limit = 100): Promise<ActivityLog[]> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('activity_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('[getActivityLog]', error);
    return [];
  }
  return (data || []) as ActivityLog[];
}

export const ACTION_META: Record<
  string,
  { label: string; tone: 'accent' | 'success' | 'warning' | 'error' | 'muted' }
> = {
  create: { label: 'Buat', tone: 'success' },
  update: { label: 'Update', tone: 'accent' },
  delete: { label: 'Hapus', tone: 'error' },
  login: { label: 'Login', tone: 'muted' },
};

export const ENTITY_META: Record<string, string> = {
  vehicle: 'Armada',
  package: 'Paket',
  article: 'Artikel',
  gallery: 'Galeri',
  testimonial: 'Testimoni',
  faq: 'FAQ',
  auth: 'Autentikasi',
};