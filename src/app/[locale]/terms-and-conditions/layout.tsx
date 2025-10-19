import { generateAlternates, generateFullPath } from '@/lib/metadata';
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
      images: [
        {
          url: '/assets/logo.png',
          width: 800,
          height: 450,
          alt: 'Anepal Foundation - Empowering Communities in Nepal',
          type: 'image/png'
        },
        {
          url: '/assets/logo-transparent.png',
          width: 800,
          height: 450,
          alt: 'Anepal Foundation Logo',
          type: 'image/png'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Terms and Conditions',
      description:
        'Read our terms and conditions to understand the rules, guidelines, and agreements that govern your use of Anepal Foundation services and website.'
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
