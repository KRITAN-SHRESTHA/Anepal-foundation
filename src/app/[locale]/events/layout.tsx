import {
  generateAlternates,
  generateFullPath,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale
} from '@/lib/metadata';
import { urlFor } from '@/sanity/lib/image';
import { serverClient } from '@/trpc/server';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  const settingsData = await serverClient.settings.getSettings();

  return {
    title: 'Anepal Foundation Events - Community Development Programs in Nepal',
    description:
      'Discover upcoming and past events organized by Anepal Foundation. Join our community programs, fundraising events, volunteer activities, and initiatives that make a difference in Nepal communities.',
    alternates: generateAlternates('/events', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title:
        'Anepal Foundation Events - Community Development Programs in Nepal',
      description:
        'Discover upcoming and past events organized by Anepal Foundation. Join our community programs, fundraising events, volunteer activities, and initiatives that make a difference in Nepal communities.',
      url: generateFullPath('/events', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      images: [
        {
          url: settingsData.foundation_logo
            ? urlFor(settingsData.foundation_logo).quality(100).url()
            : '/assets/logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'Anepal Foundation Events'
        }
      ]
    }
  };
}

export default async function Layout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div>{children}</div>;
}
