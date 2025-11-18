'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

import { trpc } from '@/trpc/client';

import AboutUsPageSkeleton from '../components/about-us-page-skeleton';
import HeroSectionThree from '@/components/hero-section-three';
import WhoWeAreSection from '../sections/who-we-are-section';
import MapSection from '../sections/map-section';
import WhyChooseSection from '../sections/why-choose-section';
import PartnersSection from '../sections/partners-sections';

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
      <HeroSectionThree title={'about us'} variant="skyblue" />
      {/* {data?.heroSection?.backgroundImage && (
        <HeroSectionTwo
          image={data.heroSection?.backgroundImage}
          title={data.heroSection?.title}
        />
      )} */}

      <WhoWeAreSection />

      <MapSection />

      <div className="bg-white">
        <WhyChooseSection />
      </div>

      {/* {data?.firstcontent && (
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
      )} */}
      {/* <WhoDoWeHelpSection /> */}
      {/* <AboutUsTeamSection /> */}

      {data?.partnersSection && (
        <PartnersSection
          className="bg-transparent pb-[100px]"
          badge_text={'Partners'}
          title={'Trusted by 1900+ founders & organization'}
          partners={data.partnersSection.partner}
          highlightTitleText={data?.partnersSection?.highlightTitle}
        />
      )}
      {/* <Separator /> */}
      {/* {data?.partnersSection && (
        <PartnersSection
          className="bg-transparent pb-[100px]"
          title={data.partnersSection.title}
          subtitle={data.partnersSection.subtitle}
          partners={data.partnersSection.partner}
          highlightTitleText={data?.partnersSection?.highlightTitle}
        />
      )} */}
    </>
  );
}
