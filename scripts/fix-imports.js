// scripts/fix-imports.js
// Move `export const dynamic` to AFTER all imports
const fs = require('fs');
const path = require('path');

function findFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      out.push(...findFiles(path.join(dir, entry.name)));
    } else if (entry.name === 'page.tsx' || entry.name === 'layout.tsx') {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

const files = findFiles('app/(public)');
console.log(`Found ${files.length} files`);

let fixed = 0;
for (const f of files) {
  let content = fs.readFileSync(f, 'utf-8');
  const original = content;

  const dynamicLine = "export const dynamic = 'force-dynamic';";

  // If dynamic is at the very top (before any imports), move it after imports
  if (content.startsWith(dynamicLine + '\n\n') || content.startsWith(dynamicLine + '\n')) {
    const lines = content.split('\n');

    // Find where imports end
    let importEndIdx = 0;
    let inImport = false;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i].trim();
      if (l.startsWith('import ') || l.startsWith('export ') && l.includes('from ')) {
        importEndIdx = i;
        inImport = true;
      } else if (l === '' && inImport) {
        // Empty line after imports
        importEndIdx = i;
        break;
      } else if (l && !l.startsWith('//') && !l.startsWith('/*') && !l.startsWith('*')) {
        // First non-import, non-empty line
        importEndIdx = i - 1;
        break;
      }
    }

    // Remove all dynamic lines
    const filtered = lines.filter((l) => l.trim() !== dynamicLine);
    const dynamicLines = lines.filter((l) => l.trim() === dynamicLine);

    // Re-insert after imports
    const newLines = [
      ...filtered.slice(0, importEndIdx + 1),
      ...dynamicLines,
      '',
      ...filtered.slice(importEndIdx + 1),
    ];

    content = newLines.join('\n');

    if (content !== original) {
      fs.writeFileSync(f, content, 'utf-8');
      fixed++;
      console.log(`Fixed: ${f}`);
    }
  }
}

console.log(`\nFixed ${fixed} files`);