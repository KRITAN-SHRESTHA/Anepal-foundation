import { baseUrl } from '@/constants';
import { serverClient } from '@/trpc/server';
import { getServerSideSitemap } from 'next-sitemap';

type Changefreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  const [blogSlugs, eventSlugs, headerSlugs] = await Promise.all([
    serverClient.blogs.getBlogs(),
    serverClient.events.getEvents(),
    serverClient.header.getHeader()
  ]);
  // const blogSlugs = await serverClient.blogs.getBlogs();
  // const eventSlugs = await serverClient.events.getEvents();
  // const headerSlugs = await serverClient.header.getHeader();

  // Define static routes
  const staticRoutes = [
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
    'privacy-policy'
  ].map(route => `${baseUrl}${route}`);

  const blogRoutes = blogSlugs?.map(slug => `${baseUrl}/blogs/${slug}`);
  const eventRoutes = eventSlugs?.map(slug => `${baseUrl}/events/${slug}`);
  const otherRoutes = headerSlugs?.map(header => `${baseUrl}${header.link}`);

  // Create a Map to store unique URLs with their highest priority
  const urlMap = new Map();

  // Helper function to set URL with priority (only updates if new priority is higher)
  const setUrlWithPriority = (url: string, priority: number) => {
    if (!urlMap.has(url) || urlMap.get(url).priority < priority) {
      urlMap.set(url, {
        loc: url,
        lastmod: new Date().toISOString(),
        changefreq: 'daily' as Changefreq,
        priority
      });
    }
  };

  // Add static routes (highest priority)
  staticRoutes.forEach(url =>
    setUrlWithPriority(url, url === baseUrl ? 1.0 : 0.8)
  );

  // Add blog routes
  blogRoutes?.forEach(url => setUrlWithPriority(url, 0.7));

  // Add event routes
  eventRoutes?.forEach(url => setUrlWithPriority(url, 0.7));

  // Add other routes from header (if they're valid URLs)
  otherRoutes?.forEach(url => {
    try {
      // Check if it's a valid URL
      new URL(url);
      setUrlWithPriority(url, 0.6);
    } catch {
      console.warn(`Invalid URL found in header links: ${url}`);
    }
  });

  // Convert Map values to array
  const fields = Array.from(urlMap.values()) as {
    loc: string;
    lastmod?: string;
    changefreq?: Changefreq;
    priority?: number;
  }[];

  return getServerSideSitemap(fields);
}
