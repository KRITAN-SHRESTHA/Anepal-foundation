import {
  generateAlternates,
  generateFullPath,
  getOpenGraphLocale,
  getOpenGraphAlternateLocales
} from '@/lib/metadata';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;

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
      alternateLocale: getOpenGraphAlternateLocales(locale)
    }
  };
}

export default async function PrivacyPolicyLayout({
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
