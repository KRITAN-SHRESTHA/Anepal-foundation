'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { trpc } from '@/trpc/client';
import HeroSectionThree from '@/components/hero-section-three';
import ContainerLayout from '@/components/container-layout';
import PageSkeleton from '@/components/page-skeleton';

import StatsSection from '../sections/stats-section';
import ThankyouSection from '../sections/thankyou-section';
import WhoHelpUsSection from '../sections/who-help-us-section';
import DonorsSection from '../sections/donors-section';

export default function DonorsPartnersView() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback={<PageSkeleton variant="blue" />}>
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
      <HeroSectionThree variant="blue" title={data.heroSection?.title} />

      <WhoHelpUsSection />

      <div className="bg-white">
        <ContainerLayout>
          <StatsSection />
        </ContainerLayout>
      </div>

      <DonorsSection />

      <ThankyouSection />
    </div>
  );
}
