import React from 'react';
import HeroSection from '../sections/hero-section';
import InfoSectionOne from '../sections/info-section-one';
import InfoSectionaTwo from '../sections/info-section-two';
import WhoDoWeHelpSection from '@/modules/home/ui/sections/who-do-we-help-section';
import TeamSection from '../sections/team-section';
import PartnersSection from '@/modules/home/ui/sections/partners-sections';
import { Separator } from '@/components/ui/separator';

export default function AboutView() {
  return (
    <>
      <HeroSection />
      <InfoSectionOne />
      <InfoSectionaTwo />
      <WhoDoWeHelpSection />
      <TeamSection />
      <PartnersSection />
      <Separator />
    </>
  );
}
