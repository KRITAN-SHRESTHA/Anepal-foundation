import StoriesView from '@/modules/stories/ui/views/stories-view';
import { HydrateClient, trpc } from '@/trpc/server';

interface StoriesPageParams {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function StoriesPage({ searchParams }: StoriesPageParams) {
  const page = (await searchParams).page;

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
