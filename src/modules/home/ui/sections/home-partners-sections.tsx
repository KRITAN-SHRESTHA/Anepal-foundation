'use client';

import PartnersSection from '@/modules/about/ui/sections/partners-sections';
import { trpc } from '@/trpc/client';
import { HTMLAttributes, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PartnerSectionProps extends HTMLAttributes<HTMLDivElement> {}

export default function HomePartnersSection(props: PartnerSectionProps) {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading...">
        <HomePartnersSectionSuspense {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

function HomePartnersSectionSuspense(props: PartnerSectionProps) {
  const [data] = trpc.home.getHomePartners.useSuspenseQuery();

  if (!data) return null;

  return (
    <PartnersSection
      partners={data.partners ?? []}
      badge_text={data?.badge_text}
      className="bg-transparent pt-0"
      {...props}
    />
  );
}
