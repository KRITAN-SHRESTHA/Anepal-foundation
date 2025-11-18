'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

import { trpc } from '@/trpc/client';
import HeroSectionThree from '@/components/hero-section-three';

import StoriesListSection from '../sections/stories-list-section';
import StoriesPageSkeleton from '../components/stories-page-skeleton';
import StoriesListPagination from '../components/stories-list-pagination';
import ContainerLayout from '@/components/container-layout';

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
  trpc.stories.getStoriesPageContent.useSuspenseQuery();
  // const [storiesData] = trpc.stories.getStoriesPageContent.useSuspenseQuery();

  return (
    <div>
      <HeroSectionThree title={'Stories'} variant="gradient" />
      {/* {storiesData?.heroSection?.backgroundImage && (
        <HeroSectionTwo
          image={storiesData.heroSection?.backgroundImage}
          title={storiesData.heroSection.title}
        />
      )} */}

      <div className="bg-white pb-20">
        <ContainerLayout>
          <StoriesListSection />
          <StoriesListPagination />
        </ContainerLayout>
      </div>
    </div>
  );
}
