import React from 'react';

import BannerSection from '../sections/banner-section';
import HeroSection from '../sections/hero-section';
import HelpSection from '../sections/help-section';

export default function HomeView() {
  return (
    <div>
      <BannerSection />
      <HeroSection />
      <HelpSection />
    </div>
  );
}
