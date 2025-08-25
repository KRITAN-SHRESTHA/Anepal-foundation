'use client';

import EditorPortableText from '@/components/EditorPortableText';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PrivacyLoading from '../components/privacy-loading';

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

  return (
    <section className="py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-4 sm:px-6 lg:px-16">
        <h1 className="max-w-3xl text-[40px] font-semibold text-pretty md:text-6xl">
          Terms and Conditions
        </h1>
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
