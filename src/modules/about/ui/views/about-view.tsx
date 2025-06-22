'use client';

import ContentSection from '@/components/content-section';
import HeroSection from '@/components/hero-section';
import PartnersSection from '@/modules/home/ui/sections/partners-sections';
import WhoDoWeHelpSection from '@/modules/home/ui/sections/who-do-we-help-section';

import TeamSection from '../sections/team-section';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { trpc } from '@/trpc/client';
import { urlFor } from '@/sanity/lib/image';

export default function AboutView() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="loading...">
        <AboutViewSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function AboutViewSuspense() {
  const [data] = trpc.aboutus.getAboutUs.useSuspenseQuery();

  return (
    <>
      {data.heroimage && (
        <HeroSection
          image={urlFor(data.heroimage)
            .auto('format')
            .width(Math.min(2048, window.innerWidth))
            .quality(100)
            .url()}
          alt={data.heroimage?.alt ?? ''}
          boldTitle="About"
          normalTitle="Organization"
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
        title={data.secondcontent?.title}
        titleClassname="text-[24px] text-primary"
        className="pt-[0px]"
        image={data.secondcontent?.image}
        imageAlt={data.secondcontent?.image?.alt}
      />
      <WhoDoWeHelpSection />
      <TeamSection />
      {/* <Separator /> */}
      <PartnersSection className="bg-transparent pb-[100px]" />
    </>
  );
}
