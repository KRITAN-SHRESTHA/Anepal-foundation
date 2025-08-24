import { getMetadataBase } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support our cause by making a donation to Anepal Foundation. Every contribution makes a difference.',
  alternates: {
    canonical: `${getMetadataBase()}/payment`
  },
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Donate',
    description:
      'Support our cause by making a donation to Anepal Foundation. Every contribution makes a difference.',
    url: `${getMetadataBase()}/payment`,
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

export default function PaymentLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
