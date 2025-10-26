import type { MetadataRoute } from 'next';
import { getClientUrl } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getClientUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/en/',
          '/es/',
          '/en/about-us',
          '/es/about-us',
          '/en/our-team',
          '/es/our-team',
          '/en/blogs',
          '/es/blogs',
          '/en/events',
          '/es/events',
          '/en/stories',
          '/es/stories',
          '/en/donors-partners',
          '/es/donors-partners',
          '/en/contacts',
          '/es/contacts',
          '/en/terms-and-conditions',
          '/es/terms-and-conditions',
          '/en/privacy-policy',
          '/es/privacy-policy'
        ],
        disallow: [
          '/api/*', // Protect API routes
          '/trpc/*', // Protect tRPC endpoints
          '/studio/*', // Protect CMS admin panel
          '/_next/*', // Protect Next.js internal files
          '/*/payment*', // Protect payment pages
          '/*.json$', // Protect JSON files
          '/*?*', // Prevent crawling URLs with query parameters
          '/*/preview' // Protect preview/draft pages
        ]
      },
      {
        userAgent: 'GPTBot', // Handle AI crawlers
        disallow: ['/'] // Prevent AI model training
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: ['/']
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`, // Link to your sitemap
    host: baseUrl // Specify canonical domain
  };
}
