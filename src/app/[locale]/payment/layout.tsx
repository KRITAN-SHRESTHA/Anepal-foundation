import { generateAlternates, generateFullPath } from '@/lib/metadata';
import type { Metadata } from 'next';

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

export default function PaymentLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
