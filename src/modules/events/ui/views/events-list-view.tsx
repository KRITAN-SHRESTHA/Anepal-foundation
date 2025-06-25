import EventsPagination from '../components/events-pagination';
import EventPageTitleSection from '../sections/event-page-title-section';
import OurEventsListSection from '../sections/our-events-list-section';

export default function EventsListView() {
  return (
    <div className="pt-15 pb-32">
      <div className="container mx-auto flex flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
        <EventPageTitleSection />
        <OurEventsListSection />
        <EventsPagination />
      </div>
    </div>
  );
}
