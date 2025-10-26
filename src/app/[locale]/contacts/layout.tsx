import {
  generateAlternates,
  generateFullPath,
  getOpenGraphLocale,
  getOpenGraphAlternateLocales
} from '@/lib/metadata';
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
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale)
    }
  };
}

export default async function ContactLayout({
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
