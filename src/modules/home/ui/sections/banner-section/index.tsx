'use client';

import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { getLocalizedString } from '@/lib/utils';
import { trpc } from '@/trpc/client';

import BannerSkeletion from './banner-skeletion';
import dynamic from 'next/dynamic';
import { useDictionary } from '@/context/dictionary-context';

const BannerImg = dynamic(() => import('./banner-img'), {
  ssr: false,
  loading: () => <BannerSkeletion />
});

export default function BannerSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<BannerSkeletion />}>
        <BannerSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function BannerSectionSuspense() {
  const [bannerData] = trpc.home.getBanner.useSuspenseQuery();
  const { locale } = useDictionary();

  return (
    <div className="w-full pb-4">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 6000
          }),
          Fade()
        ]}
        opts={{
          loop: true
        }}
      >
        <CarouselContent>
          {bannerData.map(data => (
            <CarouselItem key={data._id}>
              <div className="relative h-[65vh] w-full lg:h-[85vh]">
                <BannerImg image={data.image} title={data.title} />

                <section className="mx-auto flex h-full max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
                  <div className="relative">
                    <div className="max-w-2xl">
                      <h1 className="text-[40px] leading-[130%] font-bold text-balance text-white first-letter:capitalize md:text-5xl lg:text-6xl">
                        {getLocalizedString(data?.title ?? [], locale)}
                      </h1>
                      <p className="my-6 line-clamp-2 text-base leading-[100%] text-balance text-white first-letter:capitalize md:text-xl lg:text-2xl">
                        {getLocalizedString(data?.description ?? [], locale)}
                      </p>
                    </div>
                    {data.link && (
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-[150px]"
                      >
                        <Link href={data.link}>
                          <span className="text-nowrap">Discover more</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </section>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {bannerData.length === 1 ? null : (
          <>
            <CarouselPrevious className="top-[calc(100%-4.5rem)] right-18 left-auto size-10 translate-y-0" />
            <CarouselNext className="top-[calc(100%-4.5rem)] right-15 size-10 translate-x-full translate-y-0" />
          </>
        )}
      </Carousel>
    </div>
  );
}
