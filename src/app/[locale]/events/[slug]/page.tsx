import EventsDetailsView from '@/modules/events/ui/views/events-details-view';
import { client } from '@/sanity/lib/client';
import { Events } from '@/sanity/types';
import { HydrateClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

interface EventsDetailsPageParams {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export const revalidate = 30;

export async function generateStaticParams() {
  const events = await client.fetch<Events[]>(
    `*[_type == "events"][0...20].slug.current`,
    {},
    { next: { revalidate: 30 } }
  );
  return events.map(slug => ({
    slug: slug
  }));
}

export default async function EventsDetailsPage({
  params
}: EventsDetailsPageParams) {
  const slug = (await params).slug;
  const locale = (await params).locale;
  setRequestLocale(locale);

  void trpc.events.getOneEvent.prefetch({
    slug
  });

  return (
    <HydrateClient>
      <EventsDetailsView />
    </HydrateClient>
  );
}
