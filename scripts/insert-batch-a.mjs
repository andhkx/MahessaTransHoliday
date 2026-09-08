import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
import { BATCH_A } from './batch-a.ts';
console.log('batch-a', BATCH_A.length);
for(const a of BATCH_A){
  const row={
    title:a.title, slug:a.slug, excerpt:a.excerpt, content:a.content,
    category:a.category, meta_title:a.meta_title, meta_description:a.meta_description,
    is_featured:a.is_featured, status:'published',
    published_at: new Date().toISOString(), cover_image_url:null,
    view_count: Math.floor(Math.random()*80)+5,
  };
  const {error}=await supabase.from('articles').upsert(row,{onConflict:'slug'});
  console.log(a.slug, error? 'FAIL '+error.message : 'ok');
}
console.log('done a');
