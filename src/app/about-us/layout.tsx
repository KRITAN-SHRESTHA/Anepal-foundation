import { getMetadataBase } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn more about Anepal Foundation, our mission, vision, and the team behind our initiatives.',
  alternates: {
    canonical: `${getMetadataBase()}/about-us`
  },
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'About Us',
    description:
      'Learn more about Anepal Foundation, our mission, vision, and the team behind our initiatives.',
    url: `${getMetadataBase()}/about-us`,
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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
