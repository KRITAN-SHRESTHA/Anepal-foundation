'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'motion/react';

import { urlFor } from '@/sanity/lib/image';
import { trpc } from '@/trpc/client';
import { cn } from '@/lib/utils';
import useGetLocale from '@/hooks/use-get-locale';
import ContainerLayout from '@/components/container-layout';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import { BentoGrid, BentoGridItem } from './bento-grid';

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
    <ContainerLayout className="">
      <section className="relative py-16 lg:py-24">
        {/* Decorative Background Elements */}
        <div className="bg-accent-foreground/5 absolute top-20 left-1/4 size-96 rounded-full blur-3xl" />
        <div className="absolute right-1/4 bottom-40 size-96 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {/* Section Header - Enhanced */}
          <div className="mx-auto max-w-3xl text-center">
            {/* Section Badge */}
            <EnhancedBadge variant="green" text={subtitle} />

            {/* Title */}
            <EnhancedTitle text={`${highlightTitle} ${title}`} />

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
