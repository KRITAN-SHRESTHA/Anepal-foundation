'use client';

import React from 'react';
import { trpc } from '@/trpc/client';
import { ErrorBoundary } from 'react-error-boundary';

export default function ContactMap() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ContactMapSuspense />
    </ErrorBoundary>
  );
}

function ContactMapSuspense() {
  const [data] = trpc.settings.getSettings.useSuspenseQuery();

  if (!data?.contact?.map_embedded_link) return null;

  return (
    <div className="bg-muted/50 flex h-[450px] items-center justify-center rounded-lg">
      <iframe
        src={data?.contact?.map_embedded_link}
        className="h-[450px] w-full"
        loading="lazy"
      ></iframe>
    </div>
  );
}
