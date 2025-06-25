'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

import HeroSection from '@/components/hero-section';
import { trpc } from '@/trpc/client';

import StoriesListSection from '../sections/stories-list-section';
import StoriesPageSkeleton from '../components/stories-page-skeleton';

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
      {storiesData.heroSection?.backgroundImage && (
        <HeroSection
          image={storiesData.heroSection?.backgroundImage}
          title={storiesData.heroSection.title}
          subtitle={storiesData.heroSection.subtitle}
          alt={storiesData.heroSection.backgroundImage.alt ?? ''}
        />
      )}

      <StoriesListSection />
    </div>
  );
}
