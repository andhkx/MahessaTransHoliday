import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if(!url || !key){ console.error('missing env'); process.exit(1); }
const supabase = createClient(url, key);

const files = ['scripts/batch-a.ts','scripts/batch-b.ts','scripts/batch-c.ts','scripts/batch-d.ts'];
let all=[];
for(const f of files){
  const txt=fs.readFileSync(f,'utf8');
  const m=txt.match(/export const BATCH_[A-D] = \[([\s\S]*?)\] as const;/);
  // fallback: extract objects via eval
  const code = txt + "\nconsole.log(JSON.stringify({a:BATCH_A?.length||0,b:BATCH_B?.length||0,c:BATCH_C?.length||0,d:BATCH_D?.length||0}))";
}
// simpler: dynamic import
const a = await import(path.resolve('scripts/batch-a.ts'));
const b = await import(path.resolve('scripts/batch-b.ts'));
const c = await import(path.resolve('scripts/batch-c.ts'));
const d = await import(path.resolve('scripts/batch-d.ts'));
const merged=[...a.BATCH_A,...b.BATCH_B,...c.BATCH_C,...d.BATCH_D];
console.log('merged',merged.length);
for(const art of merged){
  const w=art.content.split(/\s+/).filter(Boolean).length;
  console.log(art.slug, w+'w', art.category, art.is_featured?'FEAT':'');
}
let inserted=0, skipped=0, failed=[];
for(const art of merged){
  const row={
    title: art.title,
    slug: art.slug,
    excerpt: art.excerpt,
    content: art.content,
    category: art.category,
    meta_title: art.meta_title,
    meta_description: art.meta_description,
    is_featured: art.is_featured,
    status: 'published',
    published_at: new Date().toISOString(),
    cover_image_url: null,
    view_count: Math.floor(Math.random()*80)+5,
  };
  const { error } = await supabase.from('articles').upsert(row, { onConflict:'slug' });
  if(error){ console.error('fail',art.slug, error.message); failed.push(art.slug); }
  else { inserted++; process.stdout.write('.'); }
}
console.log('\ninserted',inserted,'failed',failed.length, failed.join(','));
const { data, error: e2 } = await supabase.from('articles').select('slug,title,is_featured,status').eq('status','published').order('created_at',{ascending:false}).limit(25);
if(!e2) console.log('published now',data.length, data.map(x=>x.slug).join('\n'));
