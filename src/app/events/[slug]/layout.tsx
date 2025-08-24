import { getLocalizedString, getMetadataBase } from '@/lib/utils';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { serverClient } from '@/trpc/server';
import { urlFor } from '@/sanity/lib/image';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const baseUrl = getMetadataBase();
  const locale = await getLocale();

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
    alternates: {
      canonical: `${baseUrl}/events/${slug}`
    },
    openGraph: {
      type: 'article',
      siteName: 'Anepal Foundation',
      title,
      description,
      url: `${baseUrl}/events/${slug}`,
      // authors: ['Anepal Foundation'],
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
      // Only include tags if they exist and have a value
      // ...(post.tag?.name && getLocalizedString(post.tag.name, locale) ?
      //     { tags: [getLocalizedString(post.tag.name, locale)] } :
      //     {})
    }
  };
}

export default async function EventDetailsPageLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
