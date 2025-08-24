import { getMetadataBase } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Discover upcoming and past events organized by Anepal Foundation to support our community.',
  alternates: {
    canonical: `${getMetadataBase()}/events`
  },
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Events',
    description:
      'Discover upcoming and past events organized by Anepal Foundation to support our community.',
    url: `${getMetadataBase()}/events`,
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
    // images: ['/assets/events_bg.png']
  }
};

export default function EventsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
