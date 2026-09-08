import fs from 'fs';
import { BATCH_A } from './batch-a';
import { BATCH_B } from './batch-b';
import { BATCH_C } from './batch-c';
import { BATCH_D } from './batch-d';
const all = [...BATCH_A, ...BATCH_B, ...BATCH_C, ...BATCH_D];
fs.writeFileSync('scripts/articles.json', JSON.stringify(all, null, 2), 'utf8');
console.log('wrote', all.length, 'articles');
for(const a of all){
  const w=a.content.split(/\s+/).filter(Boolean).length;
  console.log(a.slug, w+'w', a.category, a.is_featured?'FEAT':'');
}
