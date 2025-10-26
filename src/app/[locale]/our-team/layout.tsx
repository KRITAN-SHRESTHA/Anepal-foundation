import { generateAlternates, generateFullPath } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

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

export default async function TeamMemberLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div>{children}</div>;
}
