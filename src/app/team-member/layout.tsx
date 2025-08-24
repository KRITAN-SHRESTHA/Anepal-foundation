import { getMetadataBase } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the dedicated team members behind Anepal Foundation who work tirelessly for our cause.',
  alternates: {
    canonical: `${getMetadataBase()}/team-member`
  },
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Our Team',
    description:
      'Meet the dedicated team members behind Anepal Foundation who work tirelessly for our cause.',
    url: `${getMetadataBase()}/team-member`,
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

export default function TeamMemberLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
