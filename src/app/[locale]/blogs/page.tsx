import BlogView from '@/modules/blogs/ui/views/blog-view';
import { HydrateClient, trpc } from '@/trpc/server';

interface OurBlogsPageParams {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function BlogsPage({ searchParams }: OurBlogsPageParams) {
  const page = (await searchParams).page;

  await Promise.all([
    trpc.blogs.getAllBlogs.prefetch({
      page: page ? Number(page) : 1
    }),
    trpc.blogs.getBlogPage.prefetch()
  ]);

  return (
    <HydrateClient>
      <BlogView />
    </HydrateClient>
  );
}
