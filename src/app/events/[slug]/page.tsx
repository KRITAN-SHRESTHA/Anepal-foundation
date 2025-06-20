import EventsDetailsView from '@/modules/events/ui/views/events-details-view';
import { HydrateClient, trpc } from '@/trpc/server';
import React from 'react';

interface EventsDetailsPageParams {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventsDetailsPage({
  params
}: EventsDetailsPageParams) {
  const slug = (await params).slug;
  console.log('slug', slug);

  void trpc.events.getOneEvent.prefetch({
    slug
  });

  return (
    <HydrateClient>
      <EventsDetailsView />
    </HydrateClient>
  );
}
