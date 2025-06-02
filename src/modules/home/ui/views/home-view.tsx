import React from 'react';

import BannerSection from '../sections/banner-section';
import HeroSection from '../sections/hero-section';
import HelpSection from '../sections/help-section';
import TeamSection from '../sections/team-section';
import WhoDoWeHelpSection from '../sections/who-do-we-help-section';
import WorkHistorySection from '../sections/work-history-section';
import MemoriesCollectionSection from '../sections/memories-collection-section';
import GallerySection from '../sections/gallery-section';
import PartnersSection from '../sections/partners-sections';
import EventsSection from '../sections/events-section';
import TestimonialsSection from '../sections/testimonials-section';
import BlogSection from '../sections/blog-section';
import VolunteerSection from '../sections/volunteer-section';

export default function HomeView() {
  return (
    <div>
      <BannerSection />
      <HeroSection />
      <HelpSection />
      <TeamSection />
      <WhoDoWeHelpSection />
      <MemoriesCollectionSection />
      <WorkHistorySection />
      <EventsSection />
      <TestimonialsSection />
      <BlogSection />
      <VolunteerSection />
      <PartnersSection />
      <GallerySection />
    </div>
  );
}
