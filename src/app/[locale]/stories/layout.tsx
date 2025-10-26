import type { Metadata } from 'next';
import {
  generateAlternates,
  generateFullPath,
  getOpenGraphLocale,
  getOpenGraphAlternateLocales
} from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;

  return {
    title: 'Stories',
    description:
      'Read inspiring stories of impact and transformation from our work at Anepal Foundation.',
    alternates: generateAlternates('/stories', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Stories',
      description:
        'Read inspiring stories of impact and transformation from our work at Anepal Foundation.',
      url: generateFullPath('/stories', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale)
    }
  };
}

export default async function StoriesLayout({
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
