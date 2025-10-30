'use client';

import HeroSectionTwo from '@/components/hero-section-2';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function ContactTitleSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<>Loading....</>}>
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

      {/* <p className="text-muted-foreground mx-auto max-w-3xl pt-20 pb-15 text-center md:text-lg">
        {getLocalizedString(data.subtitle ?? [])}
      </p> */}
    </>
  );
}
