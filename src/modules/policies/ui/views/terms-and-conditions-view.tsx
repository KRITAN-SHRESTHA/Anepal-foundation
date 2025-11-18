'use client';

import EditorPortableText from '@/components/EditorPortableText';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PrivacyLoading from '../components/privacy-loading';
import { useTranslations } from 'next-intl';
import EnhancedTitle from '@/components/enhanced-title';
import HeroSectionThree from '@/components/hero-section-three';

export default function TermsAndConditionsView() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<PrivacyLoading />}>
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
        <EnhancedTitle text={t('Terms_and_Conditions')} />
        <div>
          {locale === 'en' && data?.content?.content_en && (
            <EditorPortableText value={data.content.content_en} />
          )}
          {locale === 'es' && data?.content?.content_es && (
            <EditorPortableText value={data.content?.content_es} />
          )}
        </div>
      </div>
    </section>
  );
}
