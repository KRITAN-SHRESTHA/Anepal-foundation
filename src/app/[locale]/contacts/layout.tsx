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
    title: 'Contact Us',
    description:
      "Get in touch with Anepal Foundation. We'd love to hear from you and discuss how we can work together.",
    alternates: generateAlternates('/contacts', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Contact Us',
      description:
        "Get in touch with Anepal Foundation. We'd love to hear from you and discuss how we can work together.",
      url: generateFullPath('/contacts', locale),
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

export default function ContactLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
