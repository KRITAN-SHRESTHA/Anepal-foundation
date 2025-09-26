import { generateAlternates, generateFullPath } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;

  return {
    title: 'Our Team',
    description:
      'Meet the dedicated team members behind Anepal Foundation who work tirelessly for our cause.',
    alternates: generateAlternates('/team-member', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Our Team',
      description:
        'Meet the dedicated team members behind Anepal Foundation who work tirelessly for our cause.',
      url: generateFullPath('/team-member', locale),
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

export default function TeamMemberLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
