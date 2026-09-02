// scripts/fix-slug-dynamic.js
const fs = require('fs');
const path = require('path');

const slugPages = [
  'app/(public)/armada/[slug]/page.tsx',
  'app/(public)/paket/[slug]/page.tsx',
  'app/(public)/artikel/[slug]/page.tsx',
];

for (const f of slugPages) {
  if (!fs.existsSync(f)) continue;
  let content = fs.readFileSync(f, 'utf-8');
  const original = content;

  // If dynamic is at top (before imports), move after imports
  if (content.match(/^export const dynamic = 'force-dynamic';\n\n/)) {
    const lines = content.split('\n');
    // Find the line
    const dynamicIdx = lines.findIndex((l) => l === "export const dynamic = 'force-dynamic';");
    if (dynamicIdx === 0) {
      // Find where imports end
      let importEnd = 0;
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i].trim();
        if (l.startsWith('import ') || (l.startsWith('export ') && l.includes(' from '))) {
          importEnd = i;
        } else if (l === '' && importEnd > 0 && i > importEnd) {
          // Stop at first empty line after imports
          break;
        }
      }
      // Remove from top
      lines.splice(0, 1);
      // Insert at importEnd + 1
      const insertAt = importEnd + 1;
      lines.splice(insertAt, 0, '', "export const dynamic = 'force-dynamic';");
      content = lines.join('\n');
    }
  }

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf-8');
    console.log(`Fixed: ${f}`);
  }
}