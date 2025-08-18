'use client';

// import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';
// import EventsPageTitleSkeleton from '../components/events-page-title-skeleton';

export default function EventPageTitleSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {/* <Suspense fallback={<EventsPageTitleSkeleton />}> */}
      <EventPageTitleSectionSuspense />
      {/* </Suspense> */}
    </ErrorBoundary>
  );
}

function EventPageTitleSectionSuspense() {
  const [data] = trpc.events.getEventPage.useSuspenseQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <div className="text-center">
      <h2 className="mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl">
        {getLocalizedString(data.title ?? [])}
      </h2>
      <p className="text-muted-foreground mx-auto max-w-3xl md:text-lg">
        {getLocalizedString(data.subtitle ?? [])}
      </p>
    </div>
  );
}
