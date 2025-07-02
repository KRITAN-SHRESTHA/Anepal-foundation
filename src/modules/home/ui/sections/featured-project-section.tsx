'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { urlFor } from '@/sanity/lib/image';

import { trpc } from '@/trpc/client';
import { cn } from '@/lib/utils';
import useGetLocale from '@/hooks/use-get-locale';
import ContentTitle from '@/components/content-title';

import { BentoGrid, BentoGridItem } from './bento-grid';

export default function FeaturedProjectSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <MemoriesCollectionSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function MemoriesCollectionSectionSuspense() {
  const [data] = trpc.home.getFeaturedProjects.useSuspenseQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <div className="py-8 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <ContentTitle
          subtitle={data.subtitle}
          title={data.title}
          description={data.description}
          highlightTitleText={data.highlightTitle}
          align="center"
        />
      </div>

      <BentoGrid className="mt-14 w-full">
        {data.content?.map((item, idx) => (
          <BentoGridItem
            key={item._key}
            title={getLocalizedString(item.title ?? [])}
            description={getLocalizedString(item.description ?? [])}
            image={item.image ? urlFor(item.image).quality(100).url() : ''}
            className={cn(
              // First row: 2 items
              idx === 0 && 'md:col-span-2',
              idx === 1 && 'md:col-span-1',
              // Second row: 2 items
              idx === 2 && 'md:col-span-1',
              idx === 3 && 'md:col-span-2',
              // Third row: 2 items
              idx === 4 && 'md:col-span-2',
              idx === 5 && 'md:col-span-1',
              idx === 5 && 'md:col-span-1'
            )}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
