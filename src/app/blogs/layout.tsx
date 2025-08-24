import { getMetadataBase } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Stay updated with the latest news, stories, and insights from Anepal Foundation.',
  alternates: {
    canonical: `${getMetadataBase()}/blogs`
  },
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Blogs',
    description:
      'Stay updated with the latest news, stories, and insights from Anepal Foundation.',
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

export default function BlogsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
