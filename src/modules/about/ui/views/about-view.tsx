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
      {data?.heroSection?.backgroundImage && (
        <HeroSection
          image={data.heroSection?.backgroundImage}
          subtitle={data.heroSection?.subtitle}
          highlightTitleText={data.heroSection.highlightTitle}
          title={data.heroSection?.title}
        />
      )}

      {data?.firstcontent && (
        <ContentSection
          description={data.firstcontent?.description}
          // title={data.firstcontent.title}
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
