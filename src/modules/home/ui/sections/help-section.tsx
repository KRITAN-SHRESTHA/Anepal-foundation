'use client';

import ContentTitle from '@/components/content-title';
import CustomImage from '@/components/custom-image';
import { Card } from '@/components/ui/card';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function HelpSection() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading...">
        <HelpSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function HelpSectionSuspense() {
  const [data] = trpc.home.getOrgHelpsInFields.useSuspenseQuery();

  const { getLocalizedString } = useGetLocale();

  if (!data) return null;

  return (
    <div className="bg-accent mt-10 flex items-center justify-center py-12">
      <div>
        <ContentTitle
          subtitle={data.subtitle}
          title={data.title}
          highlightTitleText={data.highlightTitle}
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-screen-xl gap-6 px-4 sm:mt-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {data?.content?.map(feature => (
            <Card
              key={feature._key}
              className="shadow-accent-foreground h-auto rounded-xl border-none bg-transparent px-5 py-6 shadow-lg/20"
            >
              <div className="relative mb-3 flex size-[80px] items-center justify-center rounded-full">
                <CustomImage
                  className="h-full w-full object-contain mix-blend-multiply"
                  src={feature.image}
                  alt="feature"
                  fill
                  sizes="20vw"
                />
              </div>
              <div>
                <span className="text-primary text-lg font-semibold">
                  {getLocalizedString(feature.title ?? [])}
                </span>
                <p className="text-secondary-foreground mt-1 text-[15px]">
                  {getLocalizedString(feature.description ?? [])}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
