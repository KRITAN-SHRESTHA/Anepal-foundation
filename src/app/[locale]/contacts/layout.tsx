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
    title: 'Contact Anepal Foundation - Get in Touch Today',
    description:
      "Contact Anepal Foundation for inquiries, partnerships, volunteering opportunities, or donations. Reach out to discuss collaboration on community development projects in Nepal. We'd love to hear from you.",
    alternates: generateAlternates('/contacts', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Contact Anepal Foundation - Get in Touch Today',
      description:
        "Contact Anepal Foundation for inquiries, partnerships, volunteering opportunities, or donations. Reach out to discuss collaboration on community development projects in Nepal. We'd love to hear from you.",
      url: generateFullPath('/contacts', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      images: [
        {
          url: settingsData.foundation_logo
            ? urlFor(settingsData.foundation_logo).quality(100).url()
            : '/assets/logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'Contact Anepal Foundation'
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
