'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

import { trpc } from '@/trpc/client';

import StoriesListSection from '../sections/stories-list-section';
import StoriesPageSkeleton from '../components/stories-page-skeleton';
import StoriesListPagination from '../components/stories-list-pagination';
import HeroSectionTwo from '@/components/hero-section-2';

export default function StoriesView() {
  return (
    <ErrorBoundary fallback="Somthing went wrong">
      <Suspense fallback={<StoriesPageSkeleton />}>
        <StoriesViewSuspnse />
      </Suspense>
    </ErrorBoundary>
  );
}

function StoriesViewSuspnse() {
  const [storiesData] = trpc.stories.getStoriesPageContent.useSuspenseQuery();

  return (
    <div>
      {storiesData?.heroSection?.backgroundImage && (
        <HeroSectionTwo
          image={storiesData.heroSection?.backgroundImage}
          title={storiesData.heroSection.title}
        />
      )}

      <StoriesListSection />
      <StoriesListPagination />
    </div>
  );
}
