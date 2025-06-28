import { NextResponse } from 'next/server';
import { getArticles } from '../../lib/articles';

export async function GET() {
  try {
    const articles = await getArticles();
    const baseUrl = 'https://trendwise.com';
    const currentDate = new Date().toISOString().split('T')[0];

    const urls = [
      // Homepage
      {
        loc: baseUrl,
        lastmod: currentDate,
        changefreq: 'daily',
        priority: '1.0'
      },
      // Login page
      {
        loc: `${baseUrl}/login`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.5'
      },
      // Article pages
      ...articles.map(article => ({
        loc: `${baseUrl}/article/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
        lastmod: article.publishedAt.split('T')[0],
        changefreq: 'weekly',
        priority: article.trending ? '0.9' : '0.8'
      }))
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}