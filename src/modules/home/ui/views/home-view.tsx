import AboutUsSection from '../sections/about-us-section';
import BannerSection from '../sections/banner-section';
// import BlogSection from '../sections/blog-section';
import EventsSection from '../sections/events-section';
import GallerySection from '../sections/gallery-section';
import HelpSection from '../sections/help-section';
import MemoriesCollectionSection from '../sections/memories-collection-section';
import PartnersSection from '../sections/partners-sections';
import TeamSection from '../sections/team-section';
import TestimonialsSection from '../sections/testimonials-section';
// import VolunteerSection from '../sections/volunteer-section';
import WhoDoWeHelpSection from '../sections/who-do-we-help-section';
import WorkHistorySection from '../sections/work-history-section';

export default function HomeView() {
  return (
    <>
      <BannerSection />
      <AboutUsSection />
      <HelpSection />
      <TeamSection />
      <WhoDoWeHelpSection />
      <MemoriesCollectionSection />
      <WorkHistorySection />
      <EventsSection />
      <TestimonialsSection />
      {/* <BlogSection /> */}
      {/* <VolunteerSection /> */}
      <PartnersSection />
      <GallerySection />
    </>
  );
}
