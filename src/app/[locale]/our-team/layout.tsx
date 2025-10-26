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
    title: 'Our Team',
    description:
      'Meet the dedicated team members behind Anepal Foundation who work tirelessly for our cause.',
    alternates: generateAlternates('/our-team', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Our Team',
      description:
        'Meet the dedicated team members behind Anepal Foundation who work tirelessly for our cause.',
      url: generateFullPath('/our-team', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale)
    }
  };
}

export default async function TeamMemberLayout({
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
