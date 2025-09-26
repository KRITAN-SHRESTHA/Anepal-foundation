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
    title: 'Events',
    description:
      'Discover upcoming and past events organized by Anepal Foundation to support our community.',
    alternates: generateAlternates('/events', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Events',
      description:
        'Discover upcoming and past events organized by Anepal Foundation to support our community.',
      url: generateFullPath('/events', locale),
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

export default function EventsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
