'use client';

import React, { Suspense } from 'react';

import PaginationComponent from '@/components/pagination-component';
import useGetAllBlogs from '../hooks/use-get-all-blogs';

export default function BlogsPagination() {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <BlogsPaginationSuspense />
    </Suspense>
  );
}

function BlogsPaginationSuspense() {
  const {
    pagination: { page: currentPage, total, totalPages },
    blogs
  } = useGetAllBlogs();

  if (totalPages === 1) return null;
  if (blogs.length === 0) return null;

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
