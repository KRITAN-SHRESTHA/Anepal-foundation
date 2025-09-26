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
    title: 'Blogs',
    description:
      'Stay updated with the latest news, stories, and insights from Anepal Foundation.',
    alternates: generateAlternates(`/blogs`, locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Blogs',
      description:
        'Stay updated with the latest news, stories, and insights from Anepal Foundation.',
      url: generateFullPath('/blogs', locale),
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

export default function BlogsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
