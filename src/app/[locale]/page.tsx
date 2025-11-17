import {
  generateAlternates,
  generateFullPath,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale
} from '@/lib/metadata';
import { getClientUrl } from '@/lib/utils';
import HomeView from '@/modules/home/ui/views/home-view';
import { urlFor } from '@/sanity/lib/image';
import { HydrateClient, serverClient, trpc } from '@/trpc/server';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  const settingsData = await serverClient.settings.getSettings();

  return {
    title: 'Home - Transform Lives Through Community Development',
    description:
      'Welcome to Anepal Foundation. Discover our mission to create sustainable change in Nepal through education, community development, and humanitarian initiatives. Join our cause and make a difference today.',
    alternates: generateAlternates('/', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title:
        'Anepal Foundation - Transform Lives Through Community Development',
      description:
        'Welcome to Anepal Foundation. Discover our mission to create sustainable change in Nepal through education, community development, and humanitarian initiatives. Join our cause and make a difference today.',
      url: generateFullPath('/', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      images: [
        {
          url: settingsData.foundation_logo
            ? urlFor(settingsData.foundation_logo).quality(100).url()
            : '/assets/logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'Anepal Foundation - Transforming Lives in Nepal'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: '@anepalfoundation',
      creator: '@anepalfoundation',
      title:
        'Anepal Foundation - Transform Lives Through Community Development',
      description:
        'Welcome to Anepal Foundation. Discover our mission to create sustainable change in Nepal through education, community development, and humanitarian initiatives.',
      images: {
        url: settingsData.foundation_logo
          ? urlFor(settingsData.foundation_logo).quality(100).url()
          : '/assets/logo.jpeg',
        alt: 'Anepal Foundation Homepage',
        width: 1200,
        height: 630
      }
    }
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  await Promise.all([
    trpc.home.getBanner.prefetch(),
    trpc.header.getHeader.prefetch(),
    trpc.aboutus.getHomeAboutUs.prefetch(),
    trpc.home.getWhatWeDoToHelp.prefetch(),
    trpc.home.getWhatMakesUsUnique.prefetch(),
    trpc.home.getHomeStats.prefetch(),
    trpc.home.getHomeEventsTitle.prefetch(),
    trpc.home.getHomeTestimonials.prefetch(),
    trpc.home.getHomeTeamMembers.prefetch(),
    trpc.home.getHomePartners.prefetch(),
    trpc.home.getHomeGallery.prefetch(),
    trpc.settings.getSettings.prefetch(),
    trpc.events.getFeaturedHomeEvents.prefetch(),
    trpc.teamMember.getAboutTeamMembers.prefetch(),
    trpc.home.getHomeBlogsList.prefetch()
  ]);

  const baseUrl = getClientUrl();
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Anepal Foundation',
    url: baseUrl,
    description:
      'Leading NGO for community development in Nepal. Transform lives through sustainable development, education, and humanitarian initiatives.',
    inLanguage: ['en', 'es']
  };

  return (
    <HydrateClient>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeView />
    </HydrateClient>
  );
}
