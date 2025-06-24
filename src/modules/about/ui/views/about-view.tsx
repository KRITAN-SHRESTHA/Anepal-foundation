'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

import ContentSection from '@/components/content-section';
import HeroSection from '@/components/hero-section';
import { trpc } from '@/trpc/client';

import AboutUsTeamSection from '../sections/about-us-team-section';
import WhoDoWeHelpSection from '../sections/who-do-we-help-section';
import PartnersSection from '../sections/partners-sections';
import AboutUsPageSkeleton from '../components/about-us-page-skeleton';

export default function AboutView() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback={<AboutUsPageSkeleton />}>
        <AboutViewSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function AboutViewSuspense() {
  const [data] = trpc.aboutus.getAboutUs.useSuspenseQuery();

  return (
    <>
      {data.heroSection?.backgroundImage && (
        <HeroSection
          image={data.heroSection?.backgroundImage}
          alt={data.heroSection.backgroundImage.alt ?? ''}
          subtitle={data.heroSection?.subtitle}
          title={data.heroSection?.title}
        />
      )}
      <ContentSection
        description={data.firstcontent?.description}
        title="About Us"
        subtitle={data.firstcontent?.title}
        orientation="rtl"
        image={data.firstcontent?.image}
        imageAlt={data.firstcontent?.image?.alt}
      />
      <ContentSection
        description={data.secondcontent?.description}
        subtitle={data.secondcontent?.title}
        subtitleClassname="text-[24px] text-primary"
        className="pt-[0px]"
        image={data.secondcontent?.image}
        imageAlt={data.secondcontent?.image?.alt}
      />
      <WhoDoWeHelpSection />
      <AboutUsTeamSection />
      {/* <Separator /> */}
      <PartnersSection className="bg-transparent pb-[100px]" />
    </>
  );
}
