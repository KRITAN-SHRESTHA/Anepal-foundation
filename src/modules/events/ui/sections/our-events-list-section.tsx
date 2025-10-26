'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { Card } from '@/components/ui/card';
import useGetLocale from '@/hooks/use-get-locale';
import { urlFor } from '@/sanity/lib/image';
import { formatDateByCountry } from '@/lib/date-format';

import EventsListSkeleton from '../components/events-list-skeleton';
import useGetAllEvents from '../hooks/use-get-all-events';
import { ErrorBoundary } from 'react-error-boundary';

export default function OurEventsListSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<EventsListSkeleton />}>
        <OurEventsListSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function OurEventsListSectionSuspense() {
  const { getLocalizedString } = useGetLocale();

  const { events } = useGetAllEvents();

  if (events.length === 0) {
    return <h1>No events found</h1>;
  }

  return (
    <>
      <div className="grid w-full gap-y-10 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
        {events.map(event => (
          <Card
            key={event._id}
            className="order-last border-0 bg-transparent py-5 shadow-none sm:order-first sm:col-span-12 md:py-10 lg:col-span-10 lg:col-start-2"
          >
            <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
              <div className="sm:col-span-5">
                <Link
                  href={`/events/${event.slug?.current}`}
                  className="hover:underline"
                >
                  <h3 className="text-primary text-xl font-semibold md:text-2xl lg:text-3xl">
                    {getLocalizedString(event.title ?? [])}
                  </h3>
                </Link>
                <p className="text-muted-foreground mt-4 line-clamp-3 md:mt-5">
                  {getLocalizedString(event.short_description ?? [])}
                </p>
                <div className="mt-6 flex flex-wrap items-center space-x-4 text-sm md:mt-8">
                  <span className="text-muted-foreground">
                    <b>Starts:</b>&nbsp;
                    {event.event_time?.start &&
                      formatDateByCountry(event.event_time?.start)}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    <b>Ends:</b>&nbsp;
                    {event.event_time?.end &&
                      formatDateByCountry(event.event_time?.end)}
                  </span>
                </div>
                <div className="mt-6 flex items-center space-x-2 md:mt-8">
                  <Link
                    href={`/events/${event.slug?.current}`}
                    className="inline-flex items-center font-semibold hover:underline md:text-base"
                  >
                    <span>Read more</span>
                    <ArrowRight className="ml-2 size-4 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="order-first sm:order-last sm:col-span-5">
                <Link href={`/events/${event.slug?.current}`} className="block">
                  <div className="border-border relative aspect-16/9 overflow-clip rounded-lg border">
                    {event.mainImage && (
                      <Image
                        src={urlFor(event.mainImage).quality(100).url()}
                        alt={getLocalizedString(event.title ?? []) ?? ''}
                        fill
                        className="fade-in h-full w-full object-cover transition-opacity duration-200 hover:opacity-70"
                      />
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
