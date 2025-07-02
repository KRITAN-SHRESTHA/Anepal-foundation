'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import ContentTitle from '@/components/content-title';
import { trpc } from '@/trpc/client';
import CustomImage from '@/components/custom-image';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

export default function GallerySection() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading...">
        <GallerySectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function GallerySectionSuspense() {
  const [data] = trpc.home.getHomeGallery.useSuspenseQuery();

  return (
    <div className="mt-10 mb-25 md:mt-14">
      <ContentTitle
        subtitle={data.subtitle}
        title={data.title}
        highlightTitleText={data.highlightTitle}
        align="center"
      />

      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        className="mx-auto mt-8 w-full md:mt-14"
      >
        <CarouselContent className="">
          {data.images?.map(d => (
            <CarouselItem
              key={d._key}
              className="relative basis-1/2 overflow-hidden pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <Card className="aspect-square border-none shadow-none">
                <CustomImage
                  src={d.image}
                  fill
                  alt="img"
                  className="object-cover transition-all duration-700 hover:scale-110"
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-[calc(100%+1rem)] right-18 left-auto size-10 translate-y-0" />
        <CarouselNext className="top-[calc(100%+1rem)] right-15 size-10 translate-x-full translate-y-0" />
      </Carousel>
    </div>
  );
}
