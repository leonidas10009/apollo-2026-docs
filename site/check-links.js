'use strict';
const fs = require('fs');
const path = require('path');

const root = process.argv[2];
const errors = [];
const warnings = [];
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(root);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file).replace(/\\/g, '/');
  if (html.includes('{{base}}')) errors.push(`${rel}: unresolved {{base}}`);
  if (!/<title>[^<]{10,}<\/title>/.test(html)) errors.push(`${rel}: missing/short title`);
  const desc = html.match(/<meta name="description" content="([^"]+)"/);
  if (!desc) errors.push(`${rel}: missing meta description`);
  else if (desc[1].length < 70) warnings.push(`${rel}: short description (${desc[1].length})`);
  if (!/<link rel="canonical" href="https:\/\/[^"]+"/.test(html)) errors.push(`${rel}: missing canonical`);
  if (!/<html lang="(en|es)">/.test(html)) errors.push(`${rel}: missing html lang`);

  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|#|data:)/.test(url)) continue;
    let target = url.split('#')[0].split('?')[0];
    if (!target) continue;
    const resolved = target.startsWith('/')
      ? path.join(root, target)
      : path.resolve(path.dirname(file), target);
    const candidates = [resolved, path.join(resolved, 'index.html')];
    if (!candidates.some((c) => fs.existsSync(c))) {
      errors.push(`${rel}: broken link ${url}`);
    }
  }
}

console.log(`Checked ${htmlFiles.length} HTML files`);
console.log(`Errors: ${errors.length}`);
for (const e of errors) console.log('  ERROR ' + e);
console.log(`Warnings: ${warnings.length}`);
for (const w of warnings) console.log('  WARN  ' + w);
process.exit(errors.length ? 1 : 0);
