const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
const src = fs.readFileSync(file, 'utf8');
const re = /content:\s*`([^`]+)`/g;
let m;
const counts = [];
while ((m = re.exec(src))) {
  const words = m[1].trim().split(/\s+/).filter(Boolean).length;
  counts.push(words);
}
console.log('per article words:', counts.join(','));
console.log('total content words:', counts.reduce((a, b) => a + b, 0));
console.log('min:', Math.min(...counts), 'max:', Math.max(...counts));