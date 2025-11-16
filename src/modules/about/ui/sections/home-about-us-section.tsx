'use client';

import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import HomeAboutLeftContent from '../components/home-about-left-content';
import HomeAboutRightContent from '../components/home-about-right-content';

export default function HomeAboutUsSection() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading...">
        <HomeAboutUsSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function HomeAboutUsSectionSuspense() {
  const [data] = trpc.aboutus.getHomeAboutUs.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  if (!data) return null;

  const badgeText = getLocalizedString(data?.badge_text ?? []);
  const title = getLocalizedString(data?.title ?? []);
  const description = getLocalizedString(data?.description ?? []);

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Decorative Background Elements */}
      <div className="bg-accent-foreground/5 absolute top-20 left-0 size-96 rounded-full blur-3xl" />
      <div className="absolute right-0 bottom-20 size-96 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-8 sm:px-6 lg:pr-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <HomeAboutLeftContent
            badgeText={badgeText}
            description={description}
            title={title}
          />

          {/* Right Content */}
          <HomeAboutRightContent imageUrl={data.image} title={title} />
        </div>
      </div>
    </section>
  );
}
