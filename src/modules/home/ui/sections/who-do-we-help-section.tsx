'use client';

import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { trpc } from '@/trpc/client';

export default function WhoDoWeHelpSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <WhoDoWeHelpSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function WhoDoWeHelpSectionSuspense() {
  const [data] = trpc.settings.getSettings.useSuspenseQuery();
  const t = useTranslations('Homepage');

  return (
    <div className="bg-accent mt-10">
      <div className="mx-auto max-w-screen-md py-12 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">Who do we help</h2>
        <div className="mt-10 grid justify-center gap-x-8 gap-y-16 sm:mt-14 sm:grid-cols-3">
          {/* Our Children */}
          <div className="grid justify-center">
            <span className="text-5xl font-semibold">
              {data.otherInfo?.totalChildren}
            </span>
            <p className="mt-6 text-lg">{t('Our_Children')}</p>
          </div>
          {/* Our Sponsors */}
          <div className="grid justify-center">
            <span className="text-5xl font-semibold">
              {data.otherInfo?.totalSponsers}
            </span>
            <p className="mt-6 text-lg">{t('Our_Sponsors')}</p>
          </div>
          {/* total dollars collected */}
          <div className="grid justify-center">
            <span className="text-5xl font-semibold">
              {data.otherInfo?.totalDollarCollected}
            </span>
            <p className="mt-6 text-lg">{t('Dollars_We_Collected')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
