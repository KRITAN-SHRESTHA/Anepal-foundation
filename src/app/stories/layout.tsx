import type { Metadata } from 'next';
import { getMetadataBase } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Stories',
  description:
    'Read inspiring stories of impact and transformation from our work at Anepal Foundation.',
  alternates: {
    canonical: `${getMetadataBase()}/stories`
  },
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Stories',
    description:
      'Read inspiring stories of impact and transformation from our work at Anepal Foundation.',
    url: `${getMetadataBase()}/stories`,
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

export default function StoriesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
