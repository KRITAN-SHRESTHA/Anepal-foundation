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
  setRequestLocale(locale);

  const settingsData = await serverClient.settings.getSettings();

  return {
    title: 'About Anepal Foundation - Our Mission, Vision & Impact',
    description:
      "Discover Anepal Foundation's mission to create sustainable development and humanitarian impact in Nepal. Learn about our vision, core values, initiatives, and the dedicated team driving positive change in communities across Nepal.",
    alternates: generateAlternates('/about-us', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'About Anepal Foundation - Our Mission, Vision & Impact',
      description:
        "Discover Anepal Foundation's mission to create sustainable development and humanitarian impact in Nepal. Learn about our vision, core values, initiatives, and the dedicated team driving positive change in communities across Nepal.",
      url: generateFullPath('/about-us', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      images: [
        {
          url: settingsData.foundation_logo
            ? urlFor(settingsData.foundation_logo).quality(100).url()
            : '/assets/logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'About Anepal Foundation'
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
