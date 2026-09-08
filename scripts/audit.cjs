const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

const re = /content:\s*`([^`]+)`/g;
let m;
const contents = [];
while ((m = re.exec(src))) contents.push(m[1]);

const counts = contents.map(c => c.trim().split(/\s+/).filter(Boolean).length);
console.log('per article:', counts.join(','));
console.log('total:', counts.reduce((a, b) => a + b, 0));
console.log('min:', Math.min(...counts), 'max:', Math.max(...counts));
console.log('under 1400 indexes:', counts.map((c, i) => c < 1400 ? (i + 1) + '(' + c + ')' : null).filter(Boolean).join(', '));
console.log('over 1800 indexes:', counts.map((c, i) => c > 1800 ? (i + 1) + '(' + c + ')' : null).filter(Boolean).join(', '));