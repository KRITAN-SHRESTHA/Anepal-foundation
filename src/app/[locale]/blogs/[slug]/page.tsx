import BlogsDetailsView from '@/modules/blogs/ui/views/blog-details-view';
import { client } from '@/sanity/lib/client';
import { Blogs } from '@/sanity/types';
import { HydrateClient, trpc } from '@/trpc/server';

interface BlogDetailsPageParams {
  params: Promise<{
    slug: string;
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
  const slug = (await params).slug;

  void trpc.blogs.getOneBlog.prefetch({
    slug
  });

  return (
    <HydrateClient>
      <BlogsDetailsView />
    </HydrateClient>
  );
}
