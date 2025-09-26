import { generateAlternates, generateFullPath } from '@/lib/metadata';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;

  return {
    title: 'Privacy Policy',
    description:
      'Learn about how Anepal Foundation collects, uses, and protects your personal information. Our privacy policy ensures transparency and protection of your data.',
    alternates: generateAlternates('/privacy-policy', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Privacy Policy',
      description:
        'Learn about how Anepal Foundation collects, uses, and protects your personal information. Our privacy policy ensures transparency and protection of your data.',
      url: generateFullPath('/privacy-policy', locale),
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
}

export default function PrivacyPolicyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
