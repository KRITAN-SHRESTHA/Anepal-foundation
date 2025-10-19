import { generateAlternates, generateFullPath } from '@/lib/metadata';
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
    title: 'Donate',
    description:
      'Support our cause by making a donation to Anepal Foundation. Every contribution makes a difference.',
    alternates: generateAlternates('/payment', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Donate',
      description:
        'Support our cause by making a donation to Anepal Foundation. Every contribution makes a difference.',
      url: generateFullPath('/payment', locale),
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
    }
  };
}

export default async function PaymentLayout({
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
