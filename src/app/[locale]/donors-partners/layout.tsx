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
    title: 'Donors & Partners',
    description:
      'Meet our valuable donors and partners who help make our mission possible at Anepal Foundation.',
    alternates: generateAlternates('/donors-partners', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Donors & Partners',
      description:
        'Meet our valuable donors and partners who help make our mission possible at Anepal Foundation.',
      url: generateFullPath('/donors-partners', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale)
    }
  };
}

export default async function DonorsPartnersLayout({
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
