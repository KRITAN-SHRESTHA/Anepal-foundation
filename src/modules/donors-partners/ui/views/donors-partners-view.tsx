'use client';

import { Suspense } from 'react';

import HeroSection from '@/components/hero-section';
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';

import WhoHelpUsSection from '../sections/who-help-us-section';
import WhoWeWorkWithSection from '../sections/who-we-work-with-section';
import ThankyouSection from '../sections/thankyou-section';

export default function DonorsPartnersView() {
  return (
    <Suspense fallback="Loading...">
      <DonorsPartnersViewSuspense />
    </Suspense>
  );
}

function DonorsPartnersViewSuspense() {
  const [data] =
    trpc.donorsPartners.getContentOfDonorsPartnersPage.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  console.log('data----', data.whoHelpUsSection.partnersName[0].partnersName);

  return (
    <div className="">
      {data.heroSection?.backgroundImage && (
        <HeroSection
          image={data.heroSection?.backgroundImage}
          boldTitle={getLocalizedString(data.heroSection.subtitle ?? []) ?? ''}
          normalTitle={getLocalizedString(data.heroSection.title ?? []) ?? ''}
          alt=""
        />
      )}

      <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <WhoHelpUsSection />
      </div>
      <div className="bg-accent">
        <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <WhoWeWorkWithSection />
        </div>
      </div>
      <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ThankyouSection />
      </div>
    </div>
  );
}
