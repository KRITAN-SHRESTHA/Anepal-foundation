import {
  generateAlternates,
  generateFullPath,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale
} from '@/lib/metadata';
import { urlFor } from '@/sanity/lib/image';
import { serverClient } from '@/trpc/server';
import { Metadata } from 'next';
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
    title: 'Terms and Conditions',
    description:
      'Read our terms and conditions to understand the rules, guidelines, and agreements that govern your use of Anepal Foundation services and website.',
    alternates: generateAlternates('/terms-and-conditions', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Terms and Conditions',
      description:
        'Read our terms and conditions to understand the rules, guidelines, and agreements that govern your use of Anepal Foundation services and website.',
      url: generateFullPath('/terms-and-conditions', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      images: [
        {
          url: settingsData.foundation_logo
            ? urlFor(settingsData.foundation_logo).quality(100).url()
            : '/assets/logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'Anepal Foundation Terms and Conditions'
        }
      ]
    }
  };
}

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
