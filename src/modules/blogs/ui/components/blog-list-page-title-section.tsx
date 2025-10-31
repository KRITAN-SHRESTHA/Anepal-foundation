'use client';

import HeroSectionTwo from '@/components/hero-section-2';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PageSkeleton from '@/components/page-skeleton';

export default function BlogListPageTitleSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<PageSkeleton />}>
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
      {data?.heroSection?.backgroundImage && (
        <HeroSectionTwo
          image={data.heroSection?.backgroundImage}
          title={data.heroSection.title ?? []}
        />
      )}
    </>
  );
}
