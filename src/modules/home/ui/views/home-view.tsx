'use client';

import HomeAboutUsSection from '@/modules/about/ui/sections/home-about-us-section';
import HomeTeamMembersSection from '@/modules/team-member/ui/sections/home-team-members-section';
import BannerSection from '../sections/banner-section';
import BlogSection from '../sections/blog-section';
// import EventsSection from '../sections/events-section';
import GallerySection from '../sections/gallery-section';
import HelpSection from '../sections/help-section';
import HomePartnersSection from '../sections/home-partners-sections';
import ImpactSection from '../sections/impact-section';
import TestimonialsSection from '../sections/testimonials-section';
import WhatWeDoSection from '../sections/what-we-do-section';
import WhatMakesUsUnique from '../sections/what-makes-us-unique';

export default function HomeView() {
  return (
    <>
      <BannerSection />
      <HomeAboutUsSection />
      <ImpactSection />
      <WhatWeDoSection />
      <HelpSection />
      <WhatMakesUsUnique />
      <HomeTeamMembersSection />
      <TestimonialsSection />
      <HomePartnersSection />
      <BlogSection />
      <GallerySection />
    </>
  );
}
