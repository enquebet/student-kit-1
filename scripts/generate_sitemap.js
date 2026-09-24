import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Dynamically read tools from src/data/tools.ts
const toolsFile = fs.readFileSync(path.join(rootDir, 'src/data/tools.ts'), 'utf8');

const baseUrl = 'https://studentkit.dev';
const today = new Date().toISOString().split('T')[0];

const corePages = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/categories', changefreq: 'weekly', priority: '0.9' },
  { loc: '/ecosystem', changefreq: 'weekly', priority: '0.8' },
  { loc: '/about', changefreq: 'monthly', priority: '0.6' },
  { loc: '/privacy', changefreq: 'monthly', priority: '0.5' },
  { loc: '/terms', changefreq: 'monthly', priority: '0.5' },
];

const categorySlugs = [
  'student', 'engineering', 'math', 'developer', 'text', 'file', 
  'converters', 'finance', 'network', 'health', 'time', 'everyday'
];

let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

corePages.forEach(p => {
  sitemap += `  <url>\n    <loc>${baseUrl}${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
});

categorySlugs.forEach(slug => {
  sitemap += `  <url>\n    <loc>${baseUrl}/categories/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
});

// Extract tool slugs and categories using regex
const toolRegex = /"slug":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"category":\s*"([^"]+)"/g;
let match;
let count = 0;
while ((match = toolRegex.exec(toolsFile)) !== null) {
  const [, slug, , category] = match;
  sitemap += `  <url>\n    <loc>${baseUrl}/${category}/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.80</priority>\n  </url>\n`;
  count++;
}

sitemap += '</urlset>\n';

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log(`Generated sitemap with ${corePages.length + categorySlugs.length + count} URLs.`);
