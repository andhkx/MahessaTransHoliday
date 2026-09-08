import fs from 'fs';
function slugs(file){
  const c=fs.readFileSync(file,'utf8');
  return [...c.matchAll(/slug:\s*"([^"]+)"/g)].map(m=>m[1]);
}
for(const f of ['scripts/seed-articles.ts','scripts/batch-a.ts','scripts/batch-b.ts','scripts/batch-c.ts','scripts/batch-d.ts']){
  try{
    const s=slugs(f);
    console.log(f+': '+s.length);
    s.forEach(x=>console.log('  '+x));
  }catch(e){ console.log(f+' err '+e.message)}
  console.log('---');
}
