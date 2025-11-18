'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { trpc } from '@/trpc/client';
import EventsPageTitleSkeleton from '../components/events-page-title-skeleton';
import HeroSectionThree from '@/components/hero-section-three';

export default function EventPageTitleSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<EventsPageTitleSkeleton />}>
        <EventPageTitleSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function EventPageTitleSectionSuspense() {
  const [data] = trpc.events.getEventPage.useSuspenseQuery();

  if (!data?.heroSection) return null;

  return (
    <>
      <HeroSectionThree variant="skyblue" title={data.heroSection?.title} />
    </>
  );
}
