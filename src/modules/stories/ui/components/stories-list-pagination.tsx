'use client';

import React, { Suspense } from 'react';

import PaginationComponent from '@/components/pagination-component';

import useGetAllStories from '../hooks/use-get-all-stories';

export default function StoriesListPagination() {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <StoriesListPaginationSuspense />
    </Suspense>
  );
}

function StoriesListPaginationSuspense() {
  const {
    pagination: { page: currentPage, total, totalPages },
    stories
  } = useGetAllStories();

  if (totalPages === 1) return null;
  if (stories.length === 0) return null;

  return (
    <div className="mt-10">
      <PaginationComponent
        currentPage={currentPage}
        total={total}
        totalPages={totalPages}
      />
    </div>
  );
}
