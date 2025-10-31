'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

import ContentSection from '@/components/content-section';
import { trpc } from '@/trpc/client';

import AboutUsTeamSection from '../sections/about-us-team-section';
import WhoDoWeHelpSection from '../sections/who-do-we-help-section';
import PartnersSection from '../sections/partners-sections';
import AboutUsPageSkeleton from '../components/about-us-page-skeleton';
import HeroSectionTwo from '@/components/hero-section-2';

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
      {data?.heroSection?.backgroundImage && (
        <HeroSectionTwo
          image={data.heroSection?.backgroundImage}
          title={data.heroSection?.title}
        />
      )}

      {data?.firstcontent && (
        <ContentSection
          description={data.firstcontent?.description}
          subtitle={data.firstcontent?.subtitle}
          highlightTitleText={data.firstcontent?.title}
          orientation="rtl"
          image={data.firstcontent?.image}
        />
      )}
      {data?.secondcontent && (
        <ContentSection
          description={data.secondcontent?.description}
          subtitle={data.secondcontent?.title}
          subtitleClassname="text-[24px] text-primary"
          className="pt-[0px]"
          image={data.secondcontent?.image}
        />
      )}
      <WhoDoWeHelpSection />
      <AboutUsTeamSection />
      {/* <Separator /> */}
      {data?.partnersSection && (
        <PartnersSection
          className="bg-transparent pb-[100px]"
          title={data.partnersSection.title}
          subtitle={data.partnersSection.subtitle}
          partners={data.partnersSection.partner}
          highlightTitleText={data?.partnersSection?.highlightTitle}
        />
      )}
    </>
  );
}
