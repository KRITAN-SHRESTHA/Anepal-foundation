import Image from 'next/image';
import React from 'react';

interface HeroSectionProps {
  image: string;
  boldTitle: string;
  normalTitle: string;
}

export default function HeroSection({
  boldTitle,
  image,
  normalTitle
}: HeroSectionProps) {
  return (
    <div className="font-permanentMaker relative h-[50vh] w-full md:h-[60vh] lg:h-[70vh]">
      <Image
        src={image}
        alt={`${boldTitle} ${normalTitle}`}
        // src={urlFor(image)
        //   .auto('format')
        //   .width(Math.min(2048, window.innerWidth))
        //   .quality(100)
        //   .url()}
        // alt={getLocalizedString(title ?? [], locale) ?? 'banner-img'}
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={100}
      />

      <section className="mx-auto flex h-full max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="max-w-2xl">
            <p className="font-permanentMaker text-2xl text-white md:text-3xl">
              {boldTitle}
            </p>
            <h1 className="font-quicksand text-[40px] leading-[130%] font-medium text-balance text-white first-letter:capitalize md:text-5xl lg:text-6xl">
              {normalTitle}
              {/* {getLocalizedString(data?.title ?? [])} */}
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
