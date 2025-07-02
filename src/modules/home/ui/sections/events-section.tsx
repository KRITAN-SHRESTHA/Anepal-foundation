'use client';

import { urlFor } from '@/sanity/lib/image';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import ContentTitle from '@/components/content-title';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import { formatMDY } from '@/lib/date-format';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

export default function EventsSection() {
  return (
    <ErrorBoundary fallback="Something went worng">
      <Suspense fallback="Loading....">
        <EventsSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function EventsSectionSuspense() {
  const [eventsList] = trpc.events.getFeaturedHomeEvents.useSuspenseQuery();
  const [events] = trpc.home.getHomeEventsTitle.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  return (
    <section className="relative py-14">
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[400px] select-none">
        <Image
          src={'/assets/events_bg.png'}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="relative mx-auto flex max-w-screen-xl flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <ContentTitle
            subtitle={events.subtitle}
            title={events.title}
            description={events.short_description}
            highlightTitleText={events.highlightTitle}
          />

          <Button
            variant="outline"
            border={'purple'}
            className="w-[180px] rounded-full"
            asChild
          >
            <Link href={'/events'}>
              View all events
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {eventsList.map(event => (
            <Card key={event._id} className="grid w-full overflow-hidden pt-0">
              <div className="relative aspect-16/9 w-full">
                <Link
                  href={`/events/${event.slug?.current}`}
                  className="fade-in transition-opacity duration-200 hover:opacity-70"
                >
                  {event.mainImage && (
                    <Image
                      src={urlFor(event.mainImage).quality(100).url()}
                      alt={event.mainImage?.alt ?? ''}
                      className="h-full w-full object-cover object-center"
                      fill
                    />
                  )}
                </Link>
              </div>
              <CardHeader>
                <p className="text-muted-foreground text-sm">
                  {event.event_time?.start &&
                    formatMDY(event.event_time?.start)}{' '}
                  -{event.event_time?.end && formatMDY(event.event_time?.end)}
                </p>
                <h3 className="text-primary text-lg font-semibold hover:underline md:text-xl">
                  <Link href={`/events/${event.slug?.current}`}>
                    {getLocalizedString(event.title ?? [])}
                  </Link>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {getLocalizedString(event.short_description ?? [])}
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/events/${event.slug?.current}`}
                  className="text-foreground flex cursor-pointer items-center hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
