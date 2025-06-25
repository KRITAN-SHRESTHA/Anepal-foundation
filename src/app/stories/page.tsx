import StoriesView from '@/modules/stories/ui/views/stories-view';
import { HydrateClient, trpc } from '@/trpc/server';

export default async function StoriesPage() {
  void trpc.stories.getStoriesPageContent.prefetch();

  return (
    <HydrateClient>
      <StoriesView />
    </HydrateClient>
  );
}
