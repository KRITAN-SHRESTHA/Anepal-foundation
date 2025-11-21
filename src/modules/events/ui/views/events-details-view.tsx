'use client';

import { notFound, useParams } from 'next/navigation';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import EditorPortableText from '@/components/EditorPortableText';

import EventDetailsHeaderSection from '../sections/event-details-header-section';
import EventsDetailsSkeleton from '../components/events-details-skeleton';
import EventsDetailsFooterSection from '../sections/events-details-footer-section';
import BlogDetailsHeroSection from '@/modules/blogs/ui/sections/blog-details-hero-section';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

function ErrorFallback() {
  const t = useTranslations('Default');
  return <div>{t('Something_went_wrong')}</div>;
}

export default function EventsDetailsView() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<EventsDetailsSkeleton />}>
        <EventsDetailsViewSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function EventsDetailsViewSuspense() {
  const params = useParams();
  const { locale } = useGetLocale();

  const [data] = trpc.events.getOneEvent.useSuspenseQuery({
    slug: decodeURIComponent(params.slug as string)
  });

  if (!data) return notFound();

  return (
    <>
      <BlogDetailsHeroSection
        variant="pink"
        title={data.title}
        parentLink="/events"
        parentName="Our Events"
      />

      <div className="m-auto max-w-6xl px-4 pt-[50px] pb-32 sm:px-6 lg:px-8">
        <EventDetailsHeaderSection data={data} />
        <motion.div
          className="m-auto max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        >
          {locale === 'en' && data?.body?.body_en && (
            <EditorPortableText value={data.body.body_en} />
          )}
          {locale === 'es' && data?.body?.body_es && (
            <EditorPortableText value={data.body?.body_es} />
          )}
          <EventsDetailsFooterSection data={data} />
        </motion.div>
      </div>
    </>
  );
}
