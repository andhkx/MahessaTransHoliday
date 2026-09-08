import fs from 'fs';
function slugs(file){
  const c=fs.readFileSync(file,'utf8');
  return [...c.matchAll(/slug:\s*"([^"]+)"/g)].map(m=>m[1]);
}
function wordsOf(content){
  return content.split(/\s+/).filter(Boolean).length;
}
function stats(file){
  const c=fs.readFileSync(file,'utf8');
  const sl=slugs(file);
  console.log(file+': '+sl.length+' slugs');
  sl.forEach(s=>console.log('  '+s));
}
for(const f of ['scripts/seed-articles.ts','scripts/batch-a.ts','scripts/batch-b.ts','scripts/batch-c.ts','scripts/batch-d.ts']){
  try{ stats(f); }catch(e){ console.log(f+' missing '+e.message); }
  console.log('---');
}
import { BATCH_A } from './batch-a.ts';
import { BATCH_B } from './batch-b.ts';
import { BATCH_C } from './batch-c.ts';
import { BATCH_D } from './batch-d.ts';
const all=[...BATCH_A,...BATCH_B,...BATCH_C,...BATCH_D];
console.log('merged batches: '+all.length);
const seen=new Set();
let dup=false;
for(const a of all){ if(seen.has(a.slug)){ console.log('DUP '+a.slug); dup=true; } seen.add(a.slug); }
if(!dup) console.log('no dups in batches');
for(const a of all){
  const w=a.content.split(/\s+/).filter(Boolean).length;
  console.log(a.slug+': '+w+' words cat='+a.category+' feat='+a.is_featured);
}
