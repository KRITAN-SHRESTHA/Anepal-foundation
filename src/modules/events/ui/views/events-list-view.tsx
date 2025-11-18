import ContainerLayout from '@/components/container-layout';
import EventsPagination from '../components/events-pagination';
import EventPageTitleSection from '../sections/event-page-title-section';
import OurEventsListSection from '../sections/our-events-list-section';

export default function EventsListView() {
  return (
    <main>
      <EventPageTitleSection />
      <div className="bg-white py-20 md:py-32">
        {/* <div className="container mx-auto flex flex-col items-center gap-16 px-4 sm:px-6 lg:px-8"> */}
        <ContainerLayout className="max-w-5xl">
          <OurEventsListSection />
          <EventsPagination />
        </ContainerLayout>
      </div>
      {/* </div> */}
    </main>
  );
}
