'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

import { trpc } from '@/trpc/client';

import HeroSectionThree from '@/components/hero-section-three';
import WhoWeAreSection from '../sections/who-we-are-section';
import MapSection from '../sections/map-section';
import WhyChooseSection from '../sections/why-choose-section';
import PartnersSection from '../sections/partners-sections';
import PageSkeleton from '@/components/page-skeleton';

export default function AboutView() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback={<PageSkeleton variant="skyblue" />}>
        <AboutViewSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function AboutViewSuspense() {
  const [data] = trpc.aboutus.getAboutUs.useSuspenseQuery();

  return (
    <>
      <HeroSectionThree title={data.heroSection?.title} variant="skyblue" />

      <WhoWeAreSection />

      <MapSection />

      <div className="bg-white">
        <WhyChooseSection />
      </div>

      {data?.partnersSection && (
        <PartnersSection
          className="bg-transparent pb-[100px]"
          badge_text={data.partnersSection.badge_text}
          title={data.partnersSection.title}
          partners={data.partnersSection.partner}
        />
      )}
    </>
  );
}
