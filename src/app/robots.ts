import type { MetadataRoute } from 'next';
import { getClientUrl } from '@/lib/utils';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getClientUrl();

  return {
    rules: [
      {
        userAgent: '*',
        // allow: [
        //   '/', // Allow all public routes
        //   '/about', // Allow about page
        //   '/services', // Allow services page
        //   '/contact', // Allow contact page
        // ],
        disallow: [
          '/api/*', // Protect API routes
          '/studio/*', // Protect private routes
          '/*.json$',
          '/*?*',
          '/*/preview'
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
