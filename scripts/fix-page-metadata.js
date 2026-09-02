// scripts/fix-page-metadata.js
const fs = require('fs');
const path = require('path');

function findFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      out.push(...findFiles(path.join(dir, entry.name)));
    } else if (entry.name === 'page.tsx') {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

const files = findFiles('app/(public)');
console.log(`Found ${files.length} page.tsx files`);

let fixed = 0;
for (const f of files) {
  let content = fs.readFileSync(f, 'utf-8');
  const original = content;

  const dynamicLine = "export const dynamic = 'force-dynamic';";
  const lines = content.split('\n');

  const dynamicIdx = lines.findIndex((l) => l.trim() === dynamicLine);
  const metadataIdx = lines.findIndex((l) => l.includes('export const metadata: Metadata'));

  if (dynamicIdx !== -1 && metadataIdx !== -1 && dynamicIdx > metadataIdx) {
    // Dynamic is AFTER metadata — extract it, then re-insert right before metadata
    const dynamicContent = lines[dynamicIdx];
    lines.splice(dynamicIdx, 1);

    // After splice, metadataIdx is the same but line content has shifted.
    // Find the new index of metadata (it's the same since we removed line AFTER)
    const newMetaIdx = lines.findIndex((l) => l.includes('export const metadata: Metadata'));

    // Insert dynamic line + blank line BEFORE metadata, remove existing blank line right before metadata if any
    // Walk back to remove empty lines
    let insertIdx = newMetaIdx;
    while (insertIdx > 0 && lines[insertIdx - 1].trim() === '') {
      lines.splice(insertIdx - 1, 1);
      insertIdx--;
    }
    lines.splice(insertIdx, 0, '', dynamicContent);
  }

  // Remove any duplicate force-dynamic
  let seenDynamic = false;
  const deduped = [];
  for (const line of lines) {
    if (line.trim() === dynamicLine) {
      if (seenDynamic) continue;
      seenDynamic = true;
    }
    deduped.push(line);
  }

  content = deduped.join('\n');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf-8');
    fixed++;
    console.log(`Fixed: ${f}`);
  }
}

console.log(`\nFixed ${fixed} files`);