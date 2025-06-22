import React from 'react';
import CustomImage from './custom-image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface HeroSectionProps {
  image: SanityImageSource;
  boldTitle: string;
  normalTitle: string;
  alt: string;
}

export default function HeroSection({
  boldTitle,
  image,
  normalTitle,
  alt
}: HeroSectionProps) {
  return (
    <div className="font-permanentMaker relative h-[50vh] w-full md:h-[60vh] lg:h-[70vh]">
      {image && (
        <CustomImage
          src={image}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 780px) 60vw, (min-width: 1024px) 100vw, 1440px"
          quality={100}
        />
      )}

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
