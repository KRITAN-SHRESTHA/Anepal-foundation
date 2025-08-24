import { getMetadataBase } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with Anepal Foundation. We'd love to hear from you and discuss how we can work together.",
  alternates: {
    canonical: `${getMetadataBase()}/contacts`
  },
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Contact Us',
    description:
      "Get in touch with Anepal Foundation. We'd love to hear from you and discuss how we can work together.",
    url: `${getMetadataBase()}/contacts`,
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

export default function ContactLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
