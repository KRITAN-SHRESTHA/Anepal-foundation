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

export default function PrivacyPolicyView() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<PrivacyLoading />}>
        <PrivacyPolicyViewSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function PrivacyPolicyViewSuspense() {
  const [data] = trpc.policies.getPrivacyPolicies.useSuspenseQuery();

  const { locale } = useGetLocale();
  const t = useTranslations('Default');

  return (
    <section className="bg-white">
      <HeroSectionThree variant="skyblue" title={t('Privacy_Policy')} />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-4 py-12 sm:px-6 lg:px-16">
        <EnhancedTitle text={t('Privacy_Policy')} />
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
