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
    title: 'Our Donors & Partners - Supporting Community Development in Nepal',
    description:
      'Meet our valued donors and partners who make our mission possible at Anepal Foundation. Discover the organizations and individuals supporting sustainable development, education, and humanitarian initiatives in Nepal.',
    alternates: generateAlternates('/donors-partners', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title:
        'Our Donors & Partners - Supporting Community Development in Nepal',
      description:
        'Meet our valued donors and partners who make our mission possible at Anepal Foundation. Discover the organizations and individuals supporting sustainable development, education, and humanitarian initiatives in Nepal.',
      url: generateFullPath('/donors-partners', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      images: [
        {
          url: settingsData.foundation_logo
            ? urlFor(settingsData.foundation_logo).quality(100).url()
            : '/assets/logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'Anepal Foundation Donors and Partners'
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
