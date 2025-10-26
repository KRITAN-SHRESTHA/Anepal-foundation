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
    title: 'Blogs',
    description:
      'Stay updated with the latest news, stories, and insights from Anepal Foundation.',
    alternates: generateAlternates(`/blogs`, locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Blogs',
      description:
        'Stay updated with the latest news, stories, and insights from Anepal Foundation.',
      url: generateFullPath('/blogs', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale)
    }
  };
}

export default async function BlogsLayout({
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
