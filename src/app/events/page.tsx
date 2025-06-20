import { Suspense } from 'react';

import EventsListView from '@/modules/events/ui/views/events-list-view';
import { HydrateClient, trpc } from '@/trpc/server';

interface OurEventsPageParams {
  searchParams: Promise<{
    page: string;
  }>;
}

export default async function OurEventsPage({
  searchParams
}: OurEventsPageParams) {
  const page = (await searchParams).page ?? 1;

  void trpc.events.getAllEvents.prefetch({
    page: Number(page)
  });

  return (
    <HydrateClient>
      <Suspense
        fallback={
          <div className="h-screen w-screen bg-red-400">Loading....</div>
        }
      >
        <EventsListView />
      </Suspense>
    </HydrateClient>
  );
}
