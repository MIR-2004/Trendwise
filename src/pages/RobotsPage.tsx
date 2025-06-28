import React from 'react';

const RobotsPage: React.FC = () => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /login

# Sitemap
Sitemap: https://trendwise.com/sitemap.xml

# Crawl delay
Crawl-delay: 1`;

  return (
    <div style={{ display: 'none' }}>
      <pre>{robotsTxt}</pre>
    </div>
  );
};

export default RobotsPage;