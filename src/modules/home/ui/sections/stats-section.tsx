'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ContentTitle from '@/components/content-title';
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';

export default function StatsSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <StatsSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function StatsSectionSuspense() {
  const [data] = trpc.home.getHomeStats.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  return (
    <div className="bg-accent mt-10">
      <div className="mx-auto max-w-6xl py-12 text-center">
        <ContentTitle
          title={data.title}
          subtitle={data.subtitle}
          highlightTitleText={data.highlightTitle}
        />

        <div className="mt-10 grid justify-center gap-x-8 gap-y-16 sm:mt-14 sm:grid-cols-4">
          {data.select_stats.map(stat => (
            <HelpItem
              key={stat._id}
              value={stat.value}
              text={getLocalizedString(stat.label || [])}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function HelpItem({
  value,
  text
}: {
  value?: string | number;
  text?: string | null;
}) {
  return (
    <div className="grid justify-center">
      <span className="text-[80px] font-extrabold text-[#4a4c70]">{value}</span>
      <p className="text-lg font-black text-[#515266]">{text}</p>
    </div>
  );
}
