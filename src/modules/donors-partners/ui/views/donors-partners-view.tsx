import HeroSection from '@/components/hero-section';

import WhoHelpUsSection from '../sections/who-help-us-section';
import WhoWeWorkWithSection from '../sections/who-we-work-with-section';
import ThankyouSection from '../sections/thankyou-section';

export default function DonorsPartnersView() {
  return (
    <div className="">
      <HeroSection
        image={'/assets/main-slider/20.jpg'}
        boldTitle="Partner"
        normalTitle="& Donors"
      />

      <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <WhoHelpUsSection />
        <WhoWeWorkWithSection />
        <ThankyouSection />
      </div>
    </div>
  );
}
