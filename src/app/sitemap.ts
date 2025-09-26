import type { MetadataRoute } from 'next';
import { getClientUrl } from '@/lib/utils';
import { serverClient } from '@/trpc/server';
import { routing } from '@/i18n/routing';

type Changefreq = MetadataRoute.Sitemap[0]['changeFrequency'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, eventSlugs, headerSlugs] = await Promise.all([
    serverClient.blogs.getBlogs(),
    serverClient.events.getEvents(),
    serverClient.header.getHeader()
  ]);
  const baseUrl = getClientUrl();

  // Define static routes without baseUrl prefix initially
  const staticPaths = [
    '',
    '/about-us',
    '/blogs',
    '/contacts',
    '/donors-partners',
    '/events',
    '/payment',
    '/stories',
    '/team-member',
    '/terms-and-conditions',
    '/privacy-policy'
  ];

  // Create a Map to store unique URLs with their highest priority
  const urlMap = new Map();

  // Helper function to set URL with priority and alternates
  const setUrlWithPriority = (path: string, priority: number) => {
    routing.locales.forEach(locale => {
      const url = `${baseUrl}/${locale}${path}`;
      const alternates = {
        languages: Object.fromEntries(
          routing.locales
            .filter(l => l !== locale)
            .map(l => [
              l === 'en' ? 'en-US' : 'es-ES',
              `${baseUrl}/${l}${path}`
            ])
        )
      };

      if (!urlMap.has(url) || urlMap.get(url).priority < priority) {
        urlMap.set(url, {
          url,
          lastModified: new Date().toISOString(),
          changeFrequency: 'daily' as Changefreq,
          priority,
          alternates
        });
      }
    });
  };

  // Add static routes (highest priority)
  staticPaths.forEach(path =>
    setUrlWithPriority(path, path === '' ? 1.0 : 0.8)
  );

  // Add blog routes with alternates
  blogSlugs?.forEach(slug => {
    const path = `/blogs/${slug}`;
    setUrlWithPriority(path, 0.7);
  });

  // Add event routes with alternates
  eventSlugs?.forEach(slug => {
    const path = `/events/${slug}`;
    setUrlWithPriority(path, 0.7);
  });

  // Add other routes from header (if they're valid URLs)
  headerSlugs?.forEach(header => {
    if (header.link && !header.link.startsWith('http')) {
      try {
        setUrlWithPriority(header.link, 0.6);
      } catch {
        console.warn(`Invalid URL found in header links: ${header.link}`);
      }
    }
  });

  // Convert Map values to array
  const routes = Array.from(urlMap.values());

  return routes;
}
