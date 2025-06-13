'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';
import { urlFor } from '@/sanity/lib/image';

import { BentoGrid, BentoGridItem } from './bento-grid';
import { useTranslations } from 'next-intl';

export default function MemoriesCollectionSection() {
  const t = useTranslations('Homepage');
  return (
    <div className="py-8 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-semibold md:text-5xl">
          {t('What_makes_us_unique')}
        </h2>
        <p className="mx-auto mt-6 max-w-[62ch] text-center text-lg">
          {t(
            'We_work_altruistically_to_transform_lives_Every_donation_we_receive_is_dedicated_entirely_to_the_education_and_well_being__children'
          )}
        </p>
      </div>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <MemoriesCollectionSectionSuspense />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function MemoriesCollectionSectionSuspense() {
  const [data] = trpc.home.getWhatMakesUsUnique.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  return (
    <BentoGrid className="mt-14 w-full">
      {data.map((item, i) => (
        <BentoGridItem
          key={item._id}
          title={getLocalizedString(item.title ?? [])}
          description={getLocalizedString(item.description ?? [])}
          image={item.image ? urlFor(item.image).quality(100).url() : ''}
          className={cn(
            // First row: 2 items
            i === 0 && 'md:col-span-2',
            i === 1 && 'md:col-span-1',
            // Second row: 2 items
            i === 2 && 'md:col-span-1',
            i === 3 && 'md:col-span-2',
            // Third row: 2 items
            i === 4 && 'md:col-span-2',
            i === 5 && 'md:col-span-1',
            i === 5 && 'md:col-span-1'
          )}
        />
      ))}
    </BentoGrid>
  );
}
