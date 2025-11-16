'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

import { urlFor } from '@/sanity/lib/image';

import { trpc } from '@/trpc/client';
import { cn } from '@/lib/utils';
import useGetLocale from '@/hooks/use-get-locale';

import { BentoGrid, BentoGridItem } from './bento-grid';
import ContainerLayout from '@/components/container-layout';

export default function FeaturedProjectSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedProjectSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function FeaturedProjectSectionSuspense() {
  const [data] = trpc.home.getFeaturedProjects.useSuspenseQuery();

  const { getLocalizedString } = useGetLocale();

  if (!data) return null;

  const subtitle = getLocalizedString(data?.subtitle ?? []);
  const highlightTitle = getLocalizedString(data?.highlightTitle ?? []);
  const title = getLocalizedString(data?.title ?? []);
  const description = getLocalizedString(data?.description ?? []);

  return (
    <ContainerLayout>
      <section className="relative bg-gradient-to-b from-white via-gray-50/30 to-white py-16 lg:py-24">
        {/* Decorative Background Elements */}
        <div className="bg-accent-foreground/5 absolute top-20 left-1/4 size-96 rounded-full blur-3xl" />
        <div className="absolute right-1/4 bottom-40 size-96 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {/* Section Header - Enhanced */}
          <div className="mx-auto max-w-3xl text-center">
            {/* Section Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex"
            >
              <div className="group relative overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  animate={{
                    x: [-100, 200]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />

                <span className="from-accent-foreground/10 text-accent-foreground relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r to-purple-500/10 px-5 py-2.5 text-sm font-bold tracking-wide uppercase backdrop-blur-sm transition-all duration-300 lg:px-6 lg:py-3">
                  <motion.div
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    <Sparkles className="size-4 lg:size-5" />
                  </motion.div>
                  {subtitle}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-4xl leading-[1.1] font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                {highlightTitle && (
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-clip-text">
                      {highlightTitle}&nbsp;
                    </span>
                    {/* Underline decoration */}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="from-accent-foreground/20 absolute -bottom-1 left-0 h-3 w-full origin-left bg-gradient-to-r to-purple-500/20 lg:h-4"
                    />
                  </span>
                )}
                {title}
              </h2>
            </motion.div>

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 lg:text-lg"
              >
                {description}
              </motion.p>
            )}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <BentoGrid className="mt-14 w-full">
            {data.content?.map((item, idx) => (
              <BentoGridItem
                key={item._key}
                title={getLocalizedString(item.title ?? [])}
                description={getLocalizedString(item.description ?? [])}
                image={
                  item.image
                    ? urlFor(item.image)
                        .auto('format')
                        .width(1200)
                        .quality(80)
                        .url()
                    : ''
                }
                index={idx}
                className={cn(
                  // First row: 2 items
                  idx === 0 && 'md:col-span-2',
                  idx === 1 && 'md:col-span-1',
                  // Second row: 2 items
                  idx === 2 && 'md:col-span-1',
                  idx === 3 && 'md:col-span-2',
                  // Third row: 2 items
                  idx === 4 && 'md:col-span-2',
                  idx === 5 && 'md:col-span-1'
                )}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </section>
    </ContainerLayout>
  );
}
