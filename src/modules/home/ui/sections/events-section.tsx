'use client';

import { urlFor } from '@/sanity/lib/image';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import ContentTitle from '@/components/content-title';
import NavigationLink from '@/components/navigation-link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import useGetLocale from '@/hooks/use-get-locale';
import { formatMDY } from '@/lib/date-format';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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

  if (!events) return null;

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
            <NavigationLink href={'/events'}>
              View all events
              <ArrowRight className="ml-2 size-4" />
            </NavigationLink>
          </Button>
        </div>
        {eventsList.length === 0 ? null : (
          <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {eventsList.map(event => (
              <Card
                key={event._id}
                className="grid w-full overflow-hidden pt-0"
              >
                <div className="relative aspect-16/9 w-full">
                  <NavigationLink
                    href={`/events/${event.slug?.current}`}
                    className="fade-in transition-opacity duration-200 hover:opacity-70"
                  >
                    {event.mainImage && (
                      <Image
                        // src={urlFor(event.mainImage).quality(100).url()}
                        src={urlFor(event.mainImage)
                          .auto('format')
                          .width(1200)
                          .quality(80)
                          .url()}
                        alt={getLocalizedString(events.title ?? [])!}
                        className="h-full w-full object-cover object-center"
                        fill
                      />
                    )}
                  </NavigationLink>
                </div>
                <CardHeader>
                  <p className="text-muted-foreground text-sm">
                    {event.event_time?.start &&
                      formatMDY(event.event_time?.start)}{' '}
                    -{event.event_time?.end && formatMDY(event.event_time?.end)}
                  </p>
                  <h3 className="text-primary text-lg font-semibold hover:underline md:text-xl">
                    <NavigationLink href={`/events/${event.slug?.current}`}>
                      {getLocalizedString(event.title ?? [])}
                    </NavigationLink>
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {getLocalizedString(event.short_description ?? [])}
                  </p>
                </CardContent>
                <CardFooter>
                  <NavigationLink
                    href={`/events/${event.slug?.current}`}
                    className="text-foreground flex cursor-pointer items-center hover:underline"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </NavigationLink>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
