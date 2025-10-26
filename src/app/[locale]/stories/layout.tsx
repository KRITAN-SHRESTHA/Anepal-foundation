import {
  generateAlternates,
  generateFullPath,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale
} from '@/lib/metadata';
import { urlFor } from '@/sanity/lib/image';
import { serverClient } from '@/trpc/server';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  const settingsData = await serverClient.settings.getSettings();

  return {
    title: 'Success Stories - Real Impact from Anepal Foundation Nepal',
    description:
      "Read inspiring stories of transformation and positive change from communities we serve. Discover real-world impact of Anepal Foundation's humanitarian and development initiatives, testimonials, and success stories from Nepal.",
    alternates: generateAlternates('/stories', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Success Stories - Real Impact from Anepal Foundation Nepal',
      description:
        "Read inspiring stories of transformation and positive change from communities we serve. Discover real-world impact of Anepal Foundation's humanitarian and development initiatives, testimonials, and success stories from Nepal.",
      url: generateFullPath('/stories', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      images: [
        {
          url: settingsData.foundation_logo
            ? urlFor(settingsData.foundation_logo).quality(100).url()
            : '/assets/logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'Anepal Foundation Success Stories'
        }
      ]
    }
  };
}

export default async function Layout({
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
