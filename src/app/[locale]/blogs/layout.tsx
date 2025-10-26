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
    title: 'Anepal Foundation Blog - News, Stories & Insights from Nepal',
    description:
      'Explore the latest news, stories, and insights from Anepal Foundation. Read about community development initiatives, humanitarian work, social impact projects, and inspiring stories of transformation in Nepal.',
    alternates: generateAlternates(`/blogs`, locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Anepal Foundation Blog - News, Stories & Insights from Nepal',
      description:
        'Explore the latest news, stories, and insights from Anepal Foundation. Read about community development initiatives, humanitarian work, social impact projects, and inspiring stories of transformation in Nepal.',
      url: generateFullPath('/blogs', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      images: [
        {
          url: settingsData.foundation_logo
            ? urlFor(settingsData.foundation_logo).quality(100).url()
            : '/assets/logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'Anepal Foundation Blog'
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
