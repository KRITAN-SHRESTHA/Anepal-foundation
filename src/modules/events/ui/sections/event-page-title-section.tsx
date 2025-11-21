'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { trpc } from '@/trpc/client';
import HeroSectionThree from '@/components/hero-section-three';
import PageSkeleton from '@/components/page-skeleton';

export default function EventPageTitleSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<PageSkeleton variant="skyblue" />}>
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
