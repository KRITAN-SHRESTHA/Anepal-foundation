'use client';

import EditorPortableText from '@/components/EditorPortableText';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslations } from 'next-intl';
import EnhancedTitle from '@/components/enhanced-title';
import HeroSectionThree from '@/components/hero-section-three';
import { motion } from 'motion/react';
import PageSkeleton from '@/components/page-skeleton';

function ErrorFallback() {
  const t = useTranslations('Default');
  return <div>{t('Something_went_wrong')}</div>;
}

export default function TermsAndConditionsView() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<PageSkeleton variant="skyblue" />}>
        <TermsAndConditionsViewSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function TermsAndConditionsViewSuspense() {
  const [data] = trpc.policies.getTermsAndConditions.useSuspenseQuery();

  const { locale } = useGetLocale();
  const t = useTranslations('Default');

  return (
    <section className="bg-white">
      <HeroSectionThree variant="skyblue" title={t('Terms_and_Conditions')} />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-4 py-12 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <EnhancedTitle text={t('Terms_and_Conditions')} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          {locale === 'en' && data?.content?.content_en && (
            <EditorPortableText value={data.content.content_en} />
          )}
          {locale === 'es' && data?.content?.content_es && (
            <EditorPortableText value={data.content?.content_es} />
          )}
        </motion.div>
      </div>
    </section>
  );
}
