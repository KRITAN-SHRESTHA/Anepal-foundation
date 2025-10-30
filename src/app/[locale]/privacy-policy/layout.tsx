import {
  generateAlternates,
  generateFullPath,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale
} from '@/lib/metadata';
import { urlFor } from '@/sanity/lib/image';
import { serverClient } from '@/trpc/server';
import { Metadata } from 'next';
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
    title: 'Privacy Policy',
    description:
      'Learn about how Anepal Foundation collects, uses, and protects your personal information. Our privacy policy ensures transparency and protection of your data.',
    alternates: generateAlternates('/privacy-policy', locale),
    openGraph: {
      type: 'website',
      siteName: 'Anepal Foundation',
      title: 'Privacy Policy',
      description:
        'Learn about how Anepal Foundation collects, uses, and protects your personal information. Our privacy policy ensures transparency and protection of your data.',
      url: generateFullPath('/privacy-policy', locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      images: [
        {
          url: settingsData.foundation_logo
            ? urlFor(settingsData.foundation_logo).quality(100).url()
            : '/assets/logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'Anepal Foundation Privacy Policy'
        }
      ]
    }
  };
}

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
