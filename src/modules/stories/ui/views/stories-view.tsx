'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

import { trpc } from '@/trpc/client';
import HeroSectionThree from '@/components/hero-section-three';

import StoriesListSection from '../sections/stories-list-section';
import StoriesListPagination from '../components/stories-list-pagination';
import ContainerLayout from '@/components/container-layout';
import PageSkeleton from '@/components/page-skeleton';

export default function StoriesView() {
  return (
    <ErrorBoundary fallback="Somthing went wrong">
      <Suspense fallback={<PageSkeleton variant="gradient" />}>
        <StoriesViewSuspnse />
      </Suspense>
    </ErrorBoundary>
  );
}

function StoriesViewSuspnse() {
  const [data] = trpc.stories.getStoriesPageContent.useSuspenseQuery();

  return (
    <div>
      <HeroSectionThree title={data.heroSection?.title} variant="gradient" />

      <div className="bg-white pb-20">
        <ContainerLayout>
          <StoriesListSection />
          <StoriesListPagination />
        </ContainerLayout>
      </div>
    </div>
  );
}
