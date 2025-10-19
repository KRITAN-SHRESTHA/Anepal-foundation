import EventsListView from '@/modules/events/ui/views/events-list-view';
import { HydrateClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface OurEventsPageParams {
  searchParams: Promise<{
    page?: string;
  }>;
  params: Promise<{ locale: string }>;
}

export default async function OurEventsPage({
  searchParams,
  params
}: OurEventsPageParams) {
  const page = (await searchParams).page;
  const { locale } = await params;
  setRequestLocale(locale);

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
