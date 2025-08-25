/** @type {import('next-sitemap').IConfig} */

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://anepalfoundation.org';

module.exports = {
  siteUrl: baseUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: [
    '/studio/*',
    '/api/*',
    '/not-found',
    '/server-sitemap.xml',
    '/server-sitemap-index.xml'
  ],

  // Configure robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/studio', '/api']
      },
      { userAgent: '*', allow: '/' }
    ],
    additionalSitemaps: [`${baseUrl}/server-sitemap-index.xml`]
  }
};
