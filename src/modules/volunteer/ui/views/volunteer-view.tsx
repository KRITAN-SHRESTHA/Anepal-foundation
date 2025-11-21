'use client';

import VolunteerOpportunitiesSection from '../sections/volunteer-opportunities-section';
import VolunteerWhySection from '../sections/volunteer-why-section';
import VolunteerFormSection from '../sections/volunteer-form-section';
import HeroSectionThree from '@/components/hero-section-three';
import { trpc } from '@/trpc/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import PageSkeleton from '@/components/page-skeleton';

export default function VolunteerView() {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong loading the volunteer page.</div>}
    >
      <Suspense fallback={<PageSkeleton variant="skyblue" />}>
        <VolunteerViewContent />
      </Suspense>
    </ErrorBoundary>
  );
}

function VolunteerViewContent() {
  const [data] = trpc.volunteer.getVolunteerView.useSuspenseQuery();

  return (
    <>
      <HeroSectionThree variant="skyblue" title={data.heroSection?.title} />
      <VolunteerOpportunitiesSection />
      <VolunteerWhySection />
      <VolunteerFormSection />
    </>
  );
}
