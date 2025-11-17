'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'motion/react';
import { TrendingUp, Users, Heart, Award } from 'lucide-react';

import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';

// Icon mapping based on index
const iconMap = [TrendingUp, Users, Heart, Award];

export default function StatsSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <StatsSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function StatsSectionSuspense() {
  const [data] = trpc.home.getHomeStats.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  if (!data) return null;

  const subtitle = getLocalizedString(data?.short_description ?? []);
  // const highlightTitle = getLocalizedString(data?.highlightTitle ?? []);
  const title = getLocalizedString(data?.title ?? []);

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          {/* Badge */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block"
            >
              <span className="border-accent-foreground/20 bg-accent-foreground/5 text-accent-foreground inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {/* {highlightTitle && (
              <span className="text-accent-foreground">{highlightTitle} </span>
            )} */}
            {title}
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {data.select_stats.map((stat, index) => (
            <StatCard
              key={stat._id}
              value={stat.value}
              text={getLocalizedString(stat.label || [])}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  text,
  index
}: {
  value?: string | number;
  text?: string | null;
  index: number;
}) {
  const Icon = iconMap[index % iconMap.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      className="group relative"
    >
      <div className="hover:border-accent-foreground/30 relative h-full rounded-xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-lg">
        {/* Icon */}
        <div className="bg-accent-foreground/5 group-hover:bg-accent-foreground mb-6 inline-flex items-center justify-center rounded-lg p-3 transition-colors duration-300">
          <Icon className="text-accent-foreground size-6 transition-colors duration-300 group-hover:text-white" />
        </div>

        {/* Value */}
        <div className="mb-2">
          <span className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            {value}
          </span>
        </div>

        {/* Label */}
        <p className="text-sm font-medium text-gray-600 lg:text-base">{text}</p>

        {/* Subtle accent bar */}
        <div className="bg-accent-foreground absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full" />
      </div>
    </motion.div>
  );
}
