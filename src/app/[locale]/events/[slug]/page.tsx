import { getClientUrl, getLocalizedString } from '@/lib/utils';
import EventsDetailsView from '@/modules/events/ui/views/events-details-view';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Events } from '@/sanity/types';
import { HydrateClient, serverClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

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

  const event = await serverClient.events.getOneEvent({ slug });
  const baseUrl = getClientUrl();

  if (event) {
    const title = getLocalizedString(event.title ?? [], locale) || 'Event';
    const description =
      getLocalizedString(event.short_description ?? [], locale) || title;
    const imageUrl = event.mainImage
      ? urlFor(event.mainImage).quality(100).url()
      : '/assets/logo.jpeg';

    const eventSchema = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: title,
      description: description,
      image: imageUrl,
      startDate: event.event_time?.start,
      endDate: event.event_time?.end,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      // location: {
      //   '@type': 'Place',
      //   name: 'Nepal',
      //   address: {
      //     '@type': 'PostalAddress',
      //     addressCountry: 'NP'
      //   }
      // },
      organizer: {
        '@type': 'Organization',
        name: 'Anepal Foundation',
        url: baseUrl
      },
      offers: {
        '@type': 'Offer',
        url: `${baseUrl}/${locale}/events/${slug}`,
        availability: 'https://schema.org/InStock'
      }
    };

    return (
      <HydrateClient>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
        <EventsDetailsView />
      </HydrateClient>
    );
  }

  return (
    <HydrateClient>
      <EventsDetailsView />
    </HydrateClient>
  );
}
