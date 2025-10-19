import BlogView from '@/modules/blogs/ui/views/blog-view';
import { HydrateClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface OurBlogsPageParams {
  searchParams: Promise<{
    page?: string;
  }>;
  params: Promise<{
    locale: string;
  }>;
}

export default async function BlogsPage({
  searchParams,
  params
}: OurBlogsPageParams) {
  const page = (await searchParams).page;
  const locale = (await params).locale;
  setRequestLocale(locale);

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
