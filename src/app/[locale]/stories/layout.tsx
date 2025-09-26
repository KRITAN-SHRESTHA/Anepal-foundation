import type { Metadata } from 'next';
import { generateAlternates, generateFullPath } from '@/lib/metadata';

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

export default function StoriesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
