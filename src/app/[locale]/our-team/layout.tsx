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
    title: 'Meet Our Team - Dedicated Professionals at Anepal Foundation',
    description:
      'Meet the passionate and dedicated team members at Anepal Foundation who are committed to creating lasting positive change through community development and humanitarian initiatives in Nepal. Learn about our leadership and staff.',
    alternates: generateAlternates('/our-team', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Meet Our Team - Dedicated Professionals at Anepal Foundation',
      description:
        'Meet the passionate and dedicated team members at Anepal Foundation who are committed to creating lasting positive change through community development and humanitarian initiatives in Nepal. Learn about our leadership and staff.',
      url: generateFullPath('/our-team', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      images: [
        {
          url: settingsData.foundation_logo
            ? urlFor(settingsData.foundation_logo).quality(100).url()
            : '/assets/logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'Anepal Foundation Team'
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
