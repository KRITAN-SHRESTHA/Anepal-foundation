'use client';

import { Clock4, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import useGetLocale from '@/hooks/use-get-locale';

import EventsListSkeleton from '../components/events-list-skeleton';
import useGetAllEvents from '../hooks/use-get-all-events';

export default function OurEventsListSection() {
  return (
    <Suspense fallback={<EventsListSkeleton />}>
      <OurEventsListSectionSuspense />
    </Suspense>
  );
}

function OurEventsListSectionSuspense() {
  const { getLocalizedString } = useGetLocale();

  const { events } = useGetAllEvents();

  if (events.length === 0) {
    return <h1>No events found</h1>;
  }

  return (
    <div className="grid gap-12">
      {events.map(event => (
        <div key={event._id} className="flex gap-3">
          <div className="xs:grid hidden h-fit w-full max-w-[100px] bg-purple-700 px-[10px] py-[20px] shadow-sm">
            <b className="text-center text-[50px] leading-[100%] font-bold text-white">
              27
            </b>
            <span className="text-center font-medium text-white">Mar, 20</span>
          </div>
          <Card className="flex flex-1 gap-x-0 gap-y-8 overflow-hidden rounded-none border-none shadow-xl md:flex-row md:items-center">
            <div className="w-full overflow-hidden pr-6 pl-6 md:w-[40%] md:pr-0">
              <div className="relative aspect-video md:h-[230px] md:w-full">
                <Link href={`/events/${event.slug?.current}`}>
                  <Image
                    src={'/assets/main-slider/23.jpg'}
                    alt={''}
                    className="h-full w-full object-cover"
                    fill
                  />
                </Link>
              </div>
            </div>
            <div>
              <CardHeader>
                <CardTitle className="text-xl font-bold underline-offset-2 hover:underline">
                  <Link href={`/events/${event.slug?.current}`}>
                    {getLocalizedString(event.title ?? [])}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{getLocalizedString(event.short_description ?? [])}</p>
              </CardContent>
              <CardFooter className="mt-4 grid">
                <div className="flex items-center gap-3">
                  <Clock4 className="size-4" />{' '}
                  <p> September 30, 10:00 AM - October 31, 18:00 PM</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-4" />{' '}
                  <p>Dark Spurt, San Francisco, CA 94528, USA</p>
                </div>
              </CardFooter>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
