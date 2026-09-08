import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { BATCH_A } from './batch-a';
import { BATCH_B } from './batch-b';
import { BATCH_C } from './batch-c';
import { BATCH_D } from './batch-d';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(url, key);

const merged = [...BATCH_A, ...BATCH_B, ...BATCH_C, ...BATCH_D] as const;
console.log('merged', merged.length);
for (const art of merged) {
  const w = (art as any).content.split(/\s+/).filter(Boolean).length;
  console.log((art as any).slug, w + 'w', (art as any).category, (art as any).is_featured ? 'FEAT' : '');
}
let inserted = 0;
const failed: string[] = [];
for (const art of merged) {
  const a = art as any;
  const row = {
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    content: a.content,
    category: a.category,
    meta_title: a.meta_title,
    meta_description: a.meta_description,
    is_featured: a.is_featured,
    status: 'published',
    published_at: new Date().toISOString(),
    cover_image_url: null,
    view_count: Math.floor(Math.random() * 80) + 5,
  };
  const { error } = await supabase.from('articles').upsert(row, { onConflict: 'slug' });
  if (error) { console.error('fail', a.slug, error.message); failed.push(a.slug); }
  else { inserted++; process.stdout.write('.'); }
}
console.log('\ninserted', inserted, 'failed', failed.length, failed.join(','));
const { data, error: e2 } = await supabase.from('articles').select('slug,title,is_featured,status').eq('status', 'published').order('created_at', { ascending: false }).limit(30);
if (!e2 && data) { console.log('published now', data.length); data.forEach(x => console.log(x.slug + (x.is_featured ? ' FEAT' : ''))); }
else if (e2) console.error(e2.message);
