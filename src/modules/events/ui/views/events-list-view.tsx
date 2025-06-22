import OurEventsListSection from '../sections/our-events-list-section';
import EventsPagination from '../components/events-pagination';

export default function EventsListView() {
  return (
    <div className="pt-15 pb-32">
      <div className="container mx-auto flex flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl">
            Join Our Community Events
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl md:text-lg">
            Explore our calendar of events and discover unique opportunities to
            engage, grow, and support the mission of the ANepal Foundation—your
            participation helps us create lasting impact together.
          </p>
        </div>

        <OurEventsListSection />
        <EventsPagination />
      </div>
    </div>
  );
}
