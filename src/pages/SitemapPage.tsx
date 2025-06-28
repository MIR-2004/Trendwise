import React, { useEffect } from 'react';
import { mockArticles } from '../data/mockData';

const SitemapPage: React.FC = () => {
  useEffect(() => {
    // Set content type for XML
    document.contentType = 'application/xml';
  }, []);

  const baseUrl = 'https://trendwise.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const generateSitemap = () => {
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
      ...mockArticles.map(article => ({
        loc: `${baseUrl}/article/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
        lastmod: article.publishedAt.split('T')[0],
        changefreq: 'weekly',
        priority: article.trending ? '0.9' : '0.8'
      }))
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  };

  return (
    <div style={{ display: 'none' }}>
      <pre>{generateSitemap()}</pre>
    </div>
  );
};

export default SitemapPage;