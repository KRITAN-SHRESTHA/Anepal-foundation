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
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';

import BannerSkeletion from './banner-skeletion';
import BannerImg from './banner-img';

// const BannerImg = dynamic(() => import('./banner-img'), {
//   ssr: false
// });

export default function BannerSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong....</div>}>
      <Suspense fallback={<BannerSkeletion />}>
        <BannerSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function BannerSectionSuspense() {
  const [bannerData] = trpc.home.getBanner.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  if (bannerData.length === 0) return null;

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
          {bannerData.map((data, idx) => (
            <CarouselItem key={data._id}>
              <div className="relative h-[65vh] w-full lg:h-[85vh]">
                <BannerImg
                  image={data.image}
                  title={data.title}
                  priority={idx === 0}
                />

                <section className="mx-auto flex h-full max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
                  <div className="relative">
                    <div className="max-w-2xl">
                      <h1 className="text-[40px] leading-[130%] text-balance text-white first-letter:capitalize md:text-5xl lg:text-6xl">
                        <b>{getLocalizedString(data?.highlightTitle ?? [])}</b>
                        <br />
                        {getLocalizedString(data?.title ?? [])}
                      </h1>
                      <p className="my-6 line-clamp-2 text-base leading-[100%] text-balance text-white first-letter:capitalize md:text-xl lg:text-2xl">
                        {getLocalizedString(data?.description ?? [])}
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
