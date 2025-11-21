'use client';

import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PageSkeleton from '@/components/page-skeleton';
import HeroSectionThree from '@/components/hero-section-three';

export default function BlogListPageTitleSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<PageSkeleton variant="pink" />}>
        <BlogListPageTitleSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function BlogListPageTitleSectionSuspense() {
  const [data] = trpc.blogs.getBlogPage.useSuspenseQuery();
  if (!data?.heroSection) return null;

  return (
    <>
      <HeroSectionThree variant="pink" title={data.heroSection?.title} />
    </>
  );
}
