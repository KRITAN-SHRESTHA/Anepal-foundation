'use client';

import { notFound, useParams } from 'next/navigation';
// import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import EditorPortableText from '@/components/EditorPortableText';

import EventDetailsHeaderSection from '../sections/event-details-header-section';
// import EventsDetailsSkeleton from '../components/events-details-skeleton';
import EventsDetailsFooterSection from '../sections/events-details-footer-section';

export default function EventsDetailsView() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {/* <Suspense fallback={<EventsDetailsSkeleton />}> */}
      <EventsDetailsViewSuspense />
      {/* </Suspense> */}
    </ErrorBoundary>
  );
}

function EventsDetailsViewSuspense() {
  const params = useParams();
  const { locale } = useGetLocale();

  const [data] = trpc.events.getOneEvent.useSuspenseQuery({
    slug: params.slug as string
  });

  if (!data) return notFound();

  return (
    <>
      <div className="m-auto max-w-6xl px-4 pt-[50px] pb-32 sm:px-6 lg:px-8">
        <EventDetailsHeaderSection data={data} />
        <div className="m-auto max-w-3xl">
          {locale === 'en' && data?.body?.body_en && (
            <EditorPortableText value={data.body.body_en} />
          )}
          {locale === 'es' && data?.body?.body_es && (
            <EditorPortableText value={data.body?.body_es} />
          )}
          <EventsDetailsFooterSection data={data} />
        </div>
      </div>
    </>
  );
}
