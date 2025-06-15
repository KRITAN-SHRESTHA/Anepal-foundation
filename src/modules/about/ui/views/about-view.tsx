import ContentSection from '@/components/content-section';
import HeroSection from '@/components/hero-section';
import PartnersSection from '@/modules/home/ui/sections/partners-sections';
import WhoDoWeHelpSection from '@/modules/home/ui/sections/who-do-we-help-section';

import TeamSection from '../sections/team-section';

export default function AboutView() {
  return (
    <>
      <HeroSection
        image={'/assets/main-slider/24.jpg'}
        boldTitle="About"
        normalTitle="Organization"
      />
      <ContentSection
        description="Sea chub demoiselle whalefish zebra lionfish mud cat pelican eel. Minnow snoek icefish velvet-belly shark, California halibut round stingray northern sea robin. Southern grayling trout-perch Sharksucker sea toad candiru rocket danio tilefish stingray deepwater stingray Sacramento splittail, Canthigaster rostrata. Midshipman dartfish Modoc sucker, yellowtail kingfish basslet. Buri chimaera triplespine northern sea robin zingel lancetfish galjoen fish, catla wolffish, mosshead warbonnet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque elit nibh, auctor eget efficitur sit amet, luctus quis quam. Sed metus velit, bibendum non facilisis at, pulvinar vel neque. Duis ante leo, ornare non imperdiet non, porttitor sit amet metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere."
        title="About Us"
        subtitle="Help is Our Main Goal"
        orientation="rtl"
      />
      <ContentSection
        description={`Sea chub demoiselle whalefish zebra lionfish mud cat pelican eel.
          Minnow snoek icefish velvet-belly shark, California halibut round
          stingray northern sea robin. Southern grayling trout-perch Sharksucker
          sea toad candiru rocket danio tilefish stingray deepwater stingray
          Sacramento splittail, Canthigaster rostrata. Midshipman dartfish Modoc
          sucker, yellowtail kingfish basslet. Buri chimaera triplespine
          northern sea robin zingel lancetfish galjoen fish, catla wolffish,
          mosshead warbonnet. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Pellentesque elit nibh,
          auctor eget efficitur sit amet, luctus quis quam. Sed metus velit,
          bibendum non facilisis at, pulvinar vel neque. Duis ante leo, ornare
          non imperdiet non, porttitor sit amet metus. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere.`}
        title={
          'We work around the globe to save lives, defeat poverty and achieve social justice.'
        }
        titleClassname="text-[24px] text-primary"
        className="pt-[0px]"
      />
      <WhoDoWeHelpSection />
      <TeamSection />
      {/* <Separator /> */}
      <PartnersSection className="bg-transparent pb-[100px]" />
    </>
  );
}
