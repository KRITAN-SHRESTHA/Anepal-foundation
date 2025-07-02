'use client';

import { trpc } from '@/trpc/client';
import ContentSection from '@/components/content-section';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function HomeAboutUsSection() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading...">
        <HomeAboutUsSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function HomeAboutUsSectionSuspense() {
  const [data] = trpc.aboutus.getHomeAboutUs.useSuspenseQuery();

  return (
    <ContentSection
      image={data.image}
      highlightTitleText={data.highlightTitle}
      title={data.title}
      subtitle={data?.subtitle}
      description={data?.description}
      readmoreLink="/about-us"
      imageAlt={data.image?.alt}
    />
  );
}
