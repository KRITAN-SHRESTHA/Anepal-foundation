import StoriesView from '@/modules/stories/ui/views/stories-view';
import { HydrateClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface StoriesPageParams {
  searchParams: Promise<{
    page?: string;
  }>;
  params: Promise<{ locale: string }>;
}

export default async function StoriesPage({
  searchParams,
  params
}: StoriesPageParams) {
  const page = (await searchParams).page;
  const { locale } = await params;
  setRequestLocale(locale);

  await Promise.all([
    trpc.stories.getAllStories.prefetch({
      page: page ? Number(page) : 1
    }),
    trpc.stories.getStoriesPageContent.prefetch()
  ]);

  return (
    <HydrateClient>
      <StoriesView />
    </HydrateClient>
  );
}
