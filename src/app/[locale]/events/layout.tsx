import {
  generateAlternates,
  generateFullPath,
  getOpenGraphLocale,
  getOpenGraphAlternateLocales
} from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;

  return {
    title: 'Events',
    description:
      'Discover upcoming and past events organized by Anepal Foundation to support our community.',
    alternates: generateAlternates('/events', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Events',
      description:
        'Discover upcoming and past events organized by Anepal Foundation to support our community.',
      url: generateFullPath('/events', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale)
    }
  };
}

export default async function EventsLayout({
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
