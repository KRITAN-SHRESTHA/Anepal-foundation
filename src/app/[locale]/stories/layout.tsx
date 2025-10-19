import type { Metadata } from 'next';
import { generateAlternates, generateFullPath } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;

  return {
    title: 'Stories',
    description:
      'Read inspiring stories of impact and transformation from our work at Anepal Foundation.',
    alternates: generateAlternates('/stories', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Stories',
      description:
        'Read inspiring stories of impact and transformation from our work at Anepal Foundation.',
      url: generateFullPath('/stories', locale),
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

export default async function StoriesLayout({
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
