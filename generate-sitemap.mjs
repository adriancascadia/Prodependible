import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://dependable-premium.manus.space';

// Define all static routes
const staticRoutes = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/services', changefreq: 'monthly', priority: '0.9' },
  { url: '/blog', changefreq: 'weekly', priority: '0.8' },
  { url: '/faq', changefreq: 'monthly', priority: '0.7' },
  { url: '/videos', changefreq: 'monthly', priority: '0.7' },
  { url: '/resources', changefreq: 'monthly', priority: '0.8' },
  { url: '/team', changefreq: 'monthly', priority: '0.6' },
  { url: '/referrals', changefreq: 'monthly', priority: '0.6' },
  { url: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { url: '/terms', changefreq: 'yearly', priority: '0.3' },
];

// Location pages
const locations = [
  'hackensack-nj',
  'teaneck-nj',
  'fort-lee-nj',
  'fair-lawn-nj',
  'bergenfield-nj',
  'paramus-nj',
  'ridgewood-nj',
  'englewood-nj'
];

const locationRoutes = locations.map(loc => ({
  url: `/location/${loc}`,
  changefreq: 'monthly',
  priority: '0.7'
}));

// Read blog posts
let blogRoutes = [];
try {
  const blogPostsPath = path.join(__dirname, 'client/public/blog-posts.json');
  const blogData = JSON.parse(fs.readFileSync(blogPostsPath, 'utf-8'));
  blogRoutes = blogData.posts.map(post => ({
    url: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: post.date
  }));
} catch (error) {
  console.warn('Could not read blog posts:', error.message);
}

// Combine all routes
const allRoutes = [...staticRoutes, ...locationRoutes, ...blogRoutes];

// Generate XML sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : `<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write sitemap to public directory
const sitemapPath = path.join(__dirname, 'client/public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);

console.log(`✅ Sitemap generated with ${allRoutes.length} URLs`);
console.log(`📍 Location: ${sitemapPath}`);
console.log(`\nIncluded routes:`);
console.log(`  - ${staticRoutes.length} static pages`);
console.log(`  - ${locationRoutes.length} location pages`);
console.log(`  - ${blogRoutes.length} blog posts`);
