'use client';

import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { trpc } from '@/trpc/client';
import ContentTitle from '@/components/content-title';
// import ContentTitle from '@/components/content-title';

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
        <ContentTitle title={'Our Statistics'} subtitle={'What we Do'} />
        <div className="mt-10 grid justify-center gap-x-8 gap-y-16 sm:mt-14 sm:grid-cols-3">
          {/* Our Children */}
          <HelpItem
            value={data.otherInfo?.totalChildren}
            text={t('Our_Children')}
          />
          {/* Our Sponsors */}
          <HelpItem
            value={data.otherInfo?.totalSponsers}
            text={t('Our_Sponsors')}
          />
          {/* total dollars collected */}
          <HelpItem
            value={data.otherInfo?.totalDollarCollected}
            text={t('Dollars_We_Collected')}
          />
        </div>
      </div>
    </div>
  );
}

function HelpItem({ value, text }: { value?: string | number; text: string }) {
  return (
    <div className="grid justify-center">
      <span className="text-[100px] font-extrabold text-[#4a4c70]">
        {value}
      </span>
      <p className="text-lg font-black text-[#515266]">{text}</p>
    </div>
  );
}
