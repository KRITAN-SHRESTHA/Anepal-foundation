import {
  generateAlternates,
  generateFullPath,
  getOpenGraphLocale,
  getOpenGraphAlternateLocales
} from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

// Force dynamic rendering for all payment-related pages
// export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;

  return {
    title: 'Donate to Anepal Foundation - Support Community Development',
    description:
      'Make a secure donation to Anepal Foundation and support our mission to create sustainable change through education, community development, and humanitarian initiatives in Nepal.',
    robots: {
      index: false, // Don't index payment pages
      follow: true
    },
    alternates: generateAlternates('/payment', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Donate to Anepal Foundation - Support Community Development',
      description:
        'Make a secure donation to Anepal Foundation and support our mission to create sustainable change through education, community development, and humanitarian initiatives in Nepal.',
      url: generateFullPath('/payment', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale)
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
