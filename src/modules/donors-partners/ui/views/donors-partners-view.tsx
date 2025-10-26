'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import HeroSection from '@/components/hero-section';
import { trpc } from '@/trpc/client';

import StatsSection from '../sections/stats-section';
import ThankyouSection from '../sections/thankyou-section';
import WhoHelpUsSection from '../sections/who-help-us-section';
import DonorsPartnersPageSkeleton from '../components/donors-partners-page-skeleton';

export default function DonorsPartnersView() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback={<DonorsPartnersPageSkeleton />}>
        <DonorsPartnersViewSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function DonorsPartnersViewSuspense() {
  const [data] =
    trpc.donorsPartners.getContentOfDonorsPartnersPage.useSuspenseQuery();

  return (
    <div>
      {data?.heroSection?.backgroundImage && (
        <HeroSection
          image={data.heroSection?.backgroundImage}
          subtitle={data.heroSection.subtitle ?? []}
          highlightTitleText={data.heroSection.highlightTitle}
          title={data.heroSection.title ?? []}
        />
      )}

      <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <WhoHelpUsSection />
      </div>
      <div className="bg-accent">
        <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsSection />
        </div>
      </div>
      <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ThankyouSection />
      </div>
    </div>
  );
}
