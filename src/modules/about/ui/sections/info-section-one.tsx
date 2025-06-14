import Image from 'next/image';

export default function InfoSectionOne() {
  return (
    <div className="tablet:grid-cols-2 mx-auto grid w-full max-w-screen-xl items-center gap-x-12 gap-y-8 px-4 pt-[80px] pb-[50px] sm:px-6 lg:px-8 lg:pb-[80px]">
      <div className="bg-accent relative aspect-square w-full overflow-hidden rounded-xl">
        {/* {data.image && ( */}
        <Image
          className="h-full w-full object-cover"
          src={'/assets/our_story/dharmajit_budha.jpg'}
          alt=""
          // src={urlFor(data.image).quality(100).url()}
          // alt={getLocalizedString(data?.title ?? []) ?? 'hero-section-img'}
          fill
          sizes="30vw"
        />
        {/* )} */}
      </div>
      <div>
        <h1 className="tablet:max-w-[17ch] text-4xl !leading-[1.2] font-bold md:text-5xl lg:text-[2.75rem] xl:text-5xl">
          Help is Our Main Goal
          {/* {getLocalizedString(data?.title ?? [])} */}
        </h1>
        <h2 className="pt-4 text-2xl font-medium">
          Thresher shark rudd African lungfish silverside, Red salmon rockfish
          grunion, garpike zebra danio king-of-the-salmon banjo catfish.”
          {/* {getLocalizedString(data?.subtitle ?? [])} */}
        </h2>

        <p className="tablet:max-w-[60ch] pt-7 text-lg">
          Sea chub demoiselle whalefish zebra lionfish mud cat pelican eel.
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
          primis in faucibus orci luctus et ultrices posuere.
          {/* {getLocalizedString(data?.description ?? [])} */}
        </p>
      </div>
    </div>
  );
}
