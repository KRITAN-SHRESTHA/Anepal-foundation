'use client';

import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Suspense, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import NavigationLink from '@/components/navigation-link';

import BannerImg from './banner-img';
import BannerSkeletion from './banner-skeletion';
import VideoSection from './video-section';

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (bannerData.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 7000
          }),
          Fade()
        ]}
        opts={{
          loop: true,
          containScroll: false
        }}
      >
        <CarouselContent>
          {bannerData.map((data, idx) => (
            <CarouselItem key={data._id}>
              <div className="relative h-[70vh] w-full md:h-screen">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <VideoSection />
                  <BannerImg
                    image={data.image}
                    title={data.title}
                    priority={idx === 0}
                  />
                  {/* Multi-layer gradient overlay for better depth */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Content Container */}
                <section className="relative z-30 mx-auto flex h-full max-w-[1340px] items-center px-4 sm:px-6 lg:px-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`slide-${idx}-${current}`}
                      className="-mt-[130px] grid w-full gap-8 md:mt-0 lg:grid-cols-2 lg:gap-12"
                    >
                      {/* Left Content */}
                      <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
                        {/* Badge */}
                        {/* <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                        >
                          <span className="bg-accent-foreground/90 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm lg:px-6 lg:py-2.5 lg:text-sm">
                            <Heart className="size-4 animate-pulse" />
                            Making a Difference
                          </span>
                        </motion.div> */}

                        {/* Main Heading with Stagger Animation */}
                        <div className="space-y-4">
                          <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.4,
                              duration: 0.8,
                              ease: 'easeOut'
                            }}
                            className="text-4xl leading-[1.1] font-extrabold text-white md:text-5xl lg:text-7xl"
                          >
                            {getLocalizedString(data?.title ?? [])}
                          </motion.h1>

                          {/* Decorative Line */}
                          {/* <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100px' }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="from-accent-foreground h-1.5 bg-gradient-to-r to-transparent"
                          /> */}
                        </div>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.8 }}
                          className="max-w-xl text-base leading-relaxed text-white/90 md:text-lg lg:text-xl"
                        >
                          {getLocalizedString(data?.description ?? [])}
                        </motion.p>

                        {/* CTA Buttons */}
                        {data.link ? (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="flex flex-wrap items-center gap-4"
                          >
                            <NavigationLink href={data.link}>
                              <Button
                                size="lg"
                                variant="outline"
                                className="group h-12 border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white hover:text-gray-900 lg:h-14 lg:px-10 lg:text-lg"
                              >
                                Learn More
                              </Button>
                            </NavigationLink>
                          </motion.div>
                        ) : null}
                      </div>

                      {/* Right Content - Floating Cards (Desktop Only) */}
                      <div className="relative hidden lg:flex lg:items-center lg:justify-center">
                        {/* Decorative Elements */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2, duration: 1 }}
                          className="bg-accent-foreground/20 absolute top-20 right-20 size-64 rounded-full blur-3xl"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.4, duration: 1 }}
                          className="absolute right-40 bottom-20 size-48 rounded-full bg-white/10 blur-2xl"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </section>

                {/* Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.5,
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: 0.5
                  }}
                  className="absolute bottom-8 left-1/2 z-40 hidden -translate-x-1/2 md:block"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs tracking-wider text-white/80 uppercase">
                      Scroll to explore
                    </span>
                    <ChevronDown className="size-6 text-white/80" />
                  </div>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons - Redesigned */}
        {bannerData.length === 1 ? null : (
          <>
            <CarouselPrevious className="group hover:bg-accent-foreground hover:shadow-accent-foreground/50 right-20 bottom-6 z-40 size-12 rounded-full border-none bg-white/90 shadow-2xl backdrop-blur-xl transition-all duration-300 lg:top-1/2 lg:right-auto lg:bottom-auto lg:left-8 lg:size-16 lg:-translate-y-1/2 [&_svg]:size-5 [&_svg]:text-gray-900 [&_svg]:transition-colors [&_svg]:duration-300 hover:[&_svg]:text-white lg:[&_svg]:size-7!" />
            <CarouselNext className="group hover:bg-accent-foreground hover:shadow-accent-foreground/50 right-4 bottom-6 z-40 size-12 rounded-full border-none bg-white/90 shadow-2xl backdrop-blur-xl transition-all duration-300 lg:top-1/2 lg:right-8 lg:bottom-auto lg:size-16 lg:-translate-y-1/2 [&_svg]:size-5 [&_svg]:text-gray-900 [&_svg]:transition-colors [&_svg]:duration-300 hover:[&_svg]:text-white lg:[&_svg]:size-7!" />
          </>
        )}
      </Carousel>
    </div>
  );
}
