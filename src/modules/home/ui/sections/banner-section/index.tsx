'use client';

import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

import { bannerList } from './config';

export default function BannerSection() {
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
          align: 'start',
          loop: true
        }}
      >
        <CarouselContent>
          {bannerList.map(data => (
            <CarouselItem key={data.title}>
              <div className="h-[65vh] w-full lg:h-[85vh]">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                  quality={100}
                />

                <section className="mx-auto flex h-full max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
                  <div className="relative">
                    <div className="max-w-2xl">
                      <h1 className="text-[40px] leading-[130%] font-bold text-balance text-white md:text-5xl lg:text-6xl">
                        {data.title}
                      </h1>
                      <p className="my-6 line-clamp-2 text-base leading-[100%] text-balance text-white md:text-xl lg:text-2xl">
                        {data.decription}
                      </p>
                    </div>
                    {data.type === 'blog' && data.link && (
                      <Button
                        key={2}
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
        <CarouselPrevious className="top-[calc(100%-4.5rem)] right-18 left-auto size-10 translate-y-0" />
        <CarouselNext className="top-[calc(100%-4.5rem)] right-15 size-10 translate-x-full translate-y-0" />
      </Carousel>
    </div>
  );
}
