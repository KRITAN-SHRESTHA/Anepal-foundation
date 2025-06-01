import React from 'react';

import BannerSection from '../sections/banner-section';
import HeroSection from '../sections/hero-section';
import HelpSection from '../sections/help-section';
import TeamSection from '../sections/team-section';

export default function HomeView() {
  return (
    <div>
      <BannerSection />
      <HeroSection />
      <HelpSection />
      <TeamSection />
    </div>
  );
}
