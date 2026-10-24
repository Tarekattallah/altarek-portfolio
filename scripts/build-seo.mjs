// Generates sitemap.xml and feed.xml (RSS) from the site's data files.
// Run from the repo root after adding an article or case study:
//   node scripts/build-seo.mjs
import { writeFileSync } from 'node:fs';
import { blogPosts } from '../src/data/blog-posts.js';
import { projectsData } from '../src/data/projects.js';

const SITE = 'https://altarek-portfolio.vercel.app';
const today = new Date().toISOString().slice(0, 10);

const escapeXml = (text) => text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const isoDate = (label) => new Date(`${label} 00:00:00 UTC`).toISOString();

// ---- sitemap.xml ----
const pages = [
    { loc: '/', lastmod: today, priority: '1.0' },
    { loc: '/projects/', lastmod: today, priority: '0.9' },
    { loc: '/blog/', lastmod: today, priority: '0.8' },
    ...projectsData
        .filter(p => p.hasCaseStudy)
        .map(p => ({ loc: `/projects/${p.id}/`, lastmod: today, priority: '0.8' })),
    ...blogPosts.map(post => ({ loc: `/blog/${post.slug}/`, lastmod: isoDate(post.date).slice(0, 10), priority: '0.7' })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `    <url>
        <loc>${SITE}${p.loc}</loc>
        <lastmod>${p.lastmod}</lastmod>
        <priority>${p.priority}</priority>
    </url>`).join('\n')}
</urlset>
`;

// ---- feed.xml (RSS 2.0), newest first ----
const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Al-Tarek Attallah — Engineering Notes</title>
        <link>${SITE}/blog/</link>
        <description>Practical notes on backend engineering, architecture, databases, AI-assisted development, cloud, DevOps, and SRE.</description>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${posts.map(post => `        <item>
            <title>${escapeXml(post.title)}</title>
            <link>${SITE}/blog/${post.slug}/</link>
            <guid isPermaLink="true">${SITE}/blog/${post.slug}/</guid>
            <pubDate>${new Date(isoDate(post.date)).toUTCString()}</pubDate>
            <category>${escapeXml(post.category)}</category>
            <description>${escapeXml(post.description)}</description>
        </item>`).join('\n')}
    </channel>
</rss>
`;

writeFileSync('sitemap.xml', sitemap);
writeFileSync('feed.xml', feed);
console.log(`sitemap.xml: ${pages.length} URLs · feed.xml: ${posts.length} articles`);
