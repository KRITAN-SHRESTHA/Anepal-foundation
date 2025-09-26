import EventsListView from '@/modules/events/ui/views/events-list-view';
import { HydrateClient, trpc } from '@/trpc/server';

interface OurEventsPageParams {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function OurEventsPage({
  searchParams
}: OurEventsPageParams) {
  const page = (await searchParams).page;

  await Promise.all([
    trpc.events.getAllEvents.prefetch({
      page: page ? Number(page) : 1
    }),
    trpc.events.getEventPage.prefetch()
  ]);

  return (
    <HydrateClient>
      <EventsListView />
    </HydrateClient>
  );
}
