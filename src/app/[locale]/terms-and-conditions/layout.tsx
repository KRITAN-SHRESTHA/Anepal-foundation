import {
  generateAlternates,
  generateFullPath,
  getOpenGraphLocale,
  getOpenGraphAlternateLocales
} from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;

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
      alternateLocale: getOpenGraphAlternateLocales(locale)
    }
  };
}

export default async function TermsAndConditionsLayout({
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
