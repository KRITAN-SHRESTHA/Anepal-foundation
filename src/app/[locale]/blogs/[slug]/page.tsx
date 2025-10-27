import BlogsDetailsView from '@/modules/blogs/ui/views/blog-details-view';
import { client } from '@/sanity/lib/client';
import { Blogs } from '@/sanity/types';
import { HydrateClient, trpc, serverClient } from '@/trpc/server';
import { getClientUrl, getLocalizedString } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { setRequestLocale } from 'next-intl/server';

interface BlogDetailsPageParams {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export const revalidate = 30;

export async function generateStaticParams() {
  const blogs = await client.fetch<Blogs[]>(
    `*[_type == "blogs"][0...20].slug.current`,
    {},
    { next: { revalidate: 30 } }
  );
  return blogs.map(slug => ({
    slug: slug
  }));
}

export default async function BlogDetailsPage({
  params
}: BlogDetailsPageParams) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  void trpc.blogs.getOneBlog.prefetch({
    slug
  });

  const post = await serverClient.blogs.getOneBlog({ slug });
  const baseUrl = getClientUrl();

  if (post) {
    const title = getLocalizedString(post.title ?? [], locale) || 'Blog Post';
    const description =
      getLocalizedString(post.short_description ?? [], locale) || title;
    const imageUrl = post.mainImage
      ? urlFor(post.mainImage).quality(100).url()
      : '/assets/logo.jpeg';

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: title,
      description: description,
      image: imageUrl,
      datePublished: post._createdAt,
      dateModified: post._updatedAt,
      author: {
        '@type': 'Organization',
        name: 'Anepal Foundation',
        url: baseUrl
      },
      publisher: {
        '@type': 'Organization',
        name: 'Anepal Foundation',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          // url: `${baseUrl}/assets/logo.jpeg`
          url: imageUrl
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/${locale}/blogs/${slug}`
      }
    };

    return (
      <HydrateClient>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <BlogsDetailsView />
      </HydrateClient>
    );
  }

  return (
    <HydrateClient>
      <BlogsDetailsView />
    </HydrateClient>
  );
}
