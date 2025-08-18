import BlogsDetailsView from '@/modules/blogs/ui/views/blog-details-view';
import { HydrateClient, trpc } from '@/trpc/server';

interface BlogDetailsPageParams {
  params: Promise<{
    slug: string;
  }>;
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
