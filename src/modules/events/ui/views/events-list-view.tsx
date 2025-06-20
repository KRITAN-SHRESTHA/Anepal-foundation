'use client';

import HeroSection from '@/components/hero-section';
import OurEventsListSection from '../sections/our-events-list-section';

export default function EventsListView() {
  return (
    <div className="bg-accent">
      <HeroSection
        image={'/assets/main-slider/20.jpg'}
        boldTitle="Our"
        normalTitle="Events"
      />
      <OurEventsListSection />
    </div>
  );
}
