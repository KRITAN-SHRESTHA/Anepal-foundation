import { getLocalizedString } from '@/lib/utils';
import type { Metadata } from 'next';
import { serverClient } from '@/trpc/server';
import { urlFor } from '@/sanity/lib/image';
import { generateAlternates, generateFullPath } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const locale = (await params).locale;

  const event = await serverClient.events.getOneEvent({
    slug
  });

  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested eventcould not be found.'
    };
  }

  // Get localized content based on current locale
  const title =
    (event.title && getLocalizedString(event.title ?? [], locale)) || 'Event';
  const description =
    (event.short_description &&
      getLocalizedString(event.short_description, locale)) ||
    title;

  // Use logo as the default image
  const imageUrl = event.mainImage
    ? urlFor(event.mainImage).quality(100).url()
    : '/assets/logo.png';

  return {
    title,
    description,
    alternates: generateAlternates(`/events/${slug}`, locale),
    openGraph: {
      type: 'article',
      siteName: 'Anepal Foundation',
      title,
      description,
      url: generateFullPath(`/events/${slug}`, locale),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png'
        },
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png'
        }
      ]
    }
  };
}

export default async function EventDetailsPageLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>) {
  const locale = (await params).locale;
  setRequestLocale(locale);

  return <div>{children}</div>;
}
