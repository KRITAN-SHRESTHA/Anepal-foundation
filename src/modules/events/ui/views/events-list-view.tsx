import HeroSection from '@/components/hero-section';

import OurEventsListSection from '../sections/our-events-list-section';
import EventsPagination from '../components/events-pagination';

export default function EventsListView() {
  return (
    <div className="bg-accent">
      <HeroSection
        image={'/assets/main-slider/20.jpg'}
        boldTitle="Our"
        normalTitle="Events"
      />
      <div className="m-auto max-w-5xl px-4 pt-[100px] pb-32 sm:px-6 lg:px-8">
        <OurEventsListSection />
        <EventsPagination />
      </div>
    </div>
  );
}
