import { getMetadataBase } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donors & Partners',
  description:
    'Meet our valuable donors and partners who help make our mission possible at Anepal Foundation.',
  alternates: {
    canonical: `${getMetadataBase()}/donors-partners`
  },
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Donors & Partners',
    description:
      'Meet our valuable donors and partners who help make our mission possible at Anepal Foundation.',
    url: `${getMetadataBase()}/donors-partners`,
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

    // images: ['/assets/logo.png']
  }
};

export default function DonorsPartnersLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
