'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';
import BlogsPageTitleSkeleton from './blogs-page-title-skeleton';

export default function BlogListPageTitleSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<BlogsPageTitleSkeleton />}>
        <BlogListPageTitleSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function BlogListPageTitleSectionSuspense() {
  const [data] = trpc.blogs.getBlogPage.useSuspenseQuery();

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
