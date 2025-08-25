import { getMetadataBase } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    'Read our terms and conditions to understand the rules, guidelines, and agreements that govern your use of Anepal Foundation services and website.',
  alternates: {
    canonical: `${getMetadataBase()}/terms-and-conditions`
  },
  openGraph: {
    type: 'website',
    siteName: 'Anepal Foundation',
    title: 'Terms and Conditions',
    description:
      'Read our terms and conditions to understand the rules, guidelines, and agreements that govern your use of Anepal Foundation services and website.',
    url: `${getMetadataBase()}/terms-and-conditions`,
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions',
    description:
      'Read our terms and conditions to understand the rules, guidelines, and agreements that govern your use of Anepal Foundation services and website.'
  }
};

export default function TermsAndConditionsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
