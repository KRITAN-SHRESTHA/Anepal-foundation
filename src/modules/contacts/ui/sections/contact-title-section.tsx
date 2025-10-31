'use client';

import HeroSectionTwo from '@/components/hero-section-2';
import PageSkeleton from '@/components/page-skeleton';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function ContactTitleSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<PageSkeleton />}>
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
      {data?.heroSection?.backgroundImage && (
        <HeroSectionTwo
          image={data.heroSection?.backgroundImage}
          title={data.heroSection.title ?? []}
        />
      )}
    </>
  );
}
