import { getLocalizedString } from '@/lib/utils';
import type { Metadata } from 'next';
import { serverClient } from '@/trpc/server';
import { urlFor } from '@/sanity/lib/image';
import {
  generateAlternates,
  generateFullPath,
  getOpenGraphLocale,
  getOpenGraphAlternateLocales
} from '@/lib/metadata';

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const locale = (await params).locale;

  const post = await serverClient.blogs.getOneBlog({
    slug
  });

  if (!post) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  // Get localized content based on current locale
  const title =
    (post.title && getLocalizedString(post.title ?? [], locale)) || 'Blog Post';
  const description =
    (post.short_description &&
      getLocalizedString(post.short_description, locale)) ||
    title;

  // Use logo as the default image
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).quality(100).url()
    : '/assets/logo.jpeg';

  return {
    title,
    description,
    alternates: generateAlternates(`/blogs/${slug}`, locale),
    openGraph: {
      type: 'article',
      siteName: 'Anepal Foundation',
      title,
      description,
      url: generateFullPath(`/blogs/${slug}`, locale),
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      authors: ['Anepal Foundation'],
      images: [
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

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
