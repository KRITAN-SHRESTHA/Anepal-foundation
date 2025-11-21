'use client';

import HeroSectionThree from '@/components/hero-section-three';
import PageSkeleton from '@/components/page-skeleton';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function ContactTitleSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<PageSkeleton variant="gradient" />}>
        <ContactTitleSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function ContactTitleSectionSuspense() {
  const [data] = trpc.contact.getContactPage.useSuspenseQuery();

  if (!data?.heroSection) return null;

  return (
    <>
      <HeroSectionThree title={data.heroSection.title} variant="gradient" />
    </>
  );
}
