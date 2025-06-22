'use client';

import React, { Suspense } from 'react';

import PaginationComponent from '@/components/pagination-component';

import useGetAllEvents from '../hooks/use-get-all-events';

export default function EventsPagination() {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <EventsPaginationSuspense />
    </Suspense>
  );
}

function EventsPaginationSuspense() {
  const {
    pagination: { page: currentPage, total, totalPages },
    events
  } = useGetAllEvents();

  if (totalPages === 1) return null;
  if (events.length === 0) return null;

  return (
    <div className="mt-20">
      <PaginationComponent
        currentPage={currentPage}
        total={total}
        totalPages={totalPages}
      />
    </div>
  );
}
