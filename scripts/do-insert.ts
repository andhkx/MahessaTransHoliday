import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { BATCH_A } from './batch-a';
import { BATCH_B } from './batch-b';
import { BATCH_C } from './batch-c';
import { BATCH_D } from './batch-d';

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) { console.error('missing env'); process.exit(1); }
  const supabase = createClient(url, key);
  const merged: any[] = [...(BATCH_A as any), ...(BATCH_B as any), ...(BATCH_C as any), ...(BATCH_D as any)];
  console.log('merged', merged.length);
  for (const a of merged) {
    const w = a.content.split(/\s+/).filter(Boolean).length;
    console.log(a.slug, w + 'w', a.category, a.is_featured ? 'FEAT' : '');
  }
  let ok = 0;
  const failed: string[] = [];
  for (const a of merged) {
    const { error } = await supabase.from('articles').upsert({
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
    }, { onConflict: 'slug' });
    if (error) { console.error('FAIL', a.slug, error.message); failed.push(a.slug); }
    else { ok++; process.stdout.write('.'); }
  }
  console.log('\ndone', ok + '/' + merged.length, 'failed', failed.join(','));
  const { data, error } = await supabase.from('articles').select('slug,is_featured,status').eq('status','published').order('created_at',{ascending:false}).limit(35);
  if (error) console.error(error.message);
  else { console.log('published now', data.length); data.forEach((r:any)=>console.log(r.slug + (r.is_featured?' FEAT':''))); }
}
main().catch(e=>{ console.error(e); process.exit(1); });
