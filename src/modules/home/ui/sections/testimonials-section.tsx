'use client';

import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import { motion, AnimatePresence } from 'motion/react';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EnhancedBadge from '@/components/enhanced-badge';
import CustomImage from '@/components/custom-image';

export default function TestimonialsSection() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading...">
        <TestimonialsSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function TestimonialsSectionSuspense() {
  const [data] = trpc.home.getHomeTestimonials.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data || !data.select_testimonials.length) return null;

  const activeTestimonial = data.select_testimonials[activeIndex];

  const goToNext = () => {
    setActiveIndex(prev =>
      prev === data.select_testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevious = () => {
    setActiveIndex(prev =>
      prev === 0 ? data.select_testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-20 lg:py-32">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <EnhancedBadge
            text={getLocalizedString(data.badge_text ?? [])}
            variant="green"
          />
        </div>

        {/* Main Testimonial Card */}
        <div className="relative mx-auto max-w-6xl">
          <div className="relative flex flex-col items-center lg:flex-row lg:items-start">
            {/* Polaroid Image - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 sm:-mb-4 lg:-mr-12 lg:mb-0"
            >
              <div className="relative rotate-[-6deg] transform bg-white p-4 shadow-xl transition-transform duration-300 hover:rotate-[-3deg]">
                <div className="relative h-50 w-40 overflow-hidden bg-gray-100 sm:h-64 sm:w-52">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="h-full w-full"
                    >
                      {activeTestimonial.image ? (
                        <CustomImage
                          src={activeTestimonial.image}
                          fill
                          alt={activeTestimonial.user_name || 'Testimonial'}
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                          <span className="text-6xl font-bold text-gray-400">
                            {activeTestimonial.user_name?.charAt(0) || 'T'}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full overflow-hidden rounded-3xl bg-white shadow-xl"
            >
              {/* Watercolor Gradient Effect - Right Side */}
              <div className="absolute right-0 bottom-0 h-96 w-96 opacity-40">
                <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-gradient-to-br from-green-300/60 via-yellow-300/60 to-transparent blur-3xl" />
                <div className="absolute right-12 bottom-12 h-48 w-48 rounded-full bg-gradient-to-br from-yellow-300/60 via-pink-300/60 to-transparent blur-3xl" />
                <div className="absolute right-24 bottom-0 h-56 w-56 rounded-full bg-gradient-to-br from-green-400/40 via-transparent to-pink-300/60 blur-3xl" />
              </div>

              {/* Content */}
              <div className="relative p-7 sm:p-14 md:py-20 md:pr-18 md:pl-18 lg:pl-25">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Testimonial Text */}
                    <blockquote className="relative mb-8">
                      <p className="inline-block text-2xl leading-tight font-semibold text-gray-900 sm:text-3xl lg:text-2xl">
                        &ldquo;
                        {getLocalizedString(activeTestimonial.content ?? [])}
                        &rdquo;
                      </p>
                    </blockquote>

                    {/* Author Info */}
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 sm:text-2xl">
                        {activeTestimonial.user_name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-gray-600 sm:text-base">
                        {/* {activeTestimonial.role.name || 'Partner'} */}
                        {getLocalizedString(activeTestimonial.role.name ?? [])}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-12 flex items-center justify-center gap-8">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="group hover:bg-primary flex size-14 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-6 text-gray-900 transition-colors group-hover:text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-3">
              {data.select_testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-primary w-12'
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="group hover:bg-primary flex size-14 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-6 text-gray-900 transition-colors group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
