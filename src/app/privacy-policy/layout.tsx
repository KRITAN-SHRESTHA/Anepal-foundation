import { getMetadataBase } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn about how Anepal Foundation collects, uses, and protects your personal information. Our privacy policy ensures transparency and protection of your data.',
  alternates: {
    canonical: `${getMetadataBase()}/privacy-policy`
  },
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Privacy Policy',
    description:
      'Learn about how Anepal Foundation collects, uses, and protects your personal information. Our privacy policy ensures transparency and protection of your data.',
    url: `${getMetadataBase()}/privacy-policy`,
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
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Privacy Policy',
  //   description:
  //     'Learn about how Anepal Foundation collects, uses, and protects your personal information. Our privacy policy ensures transparency and protection of your data.'
  // }
};

export default function PrivacyPolicyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
