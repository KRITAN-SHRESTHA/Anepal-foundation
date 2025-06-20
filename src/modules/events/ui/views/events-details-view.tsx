'use client';

import useGetLocale from '@/hooks/use-get-locale';
import { textEditorComponentsConfig } from '@/lib/text-editor-config';
import { trpc } from '@/trpc/client';
import { PortableText } from '@portabletext/react';
// import { PortableText } from 'next-sanity';
import { useParams } from 'next/navigation';
import React, { Suspense } from 'react';

export default function EventsDetailsView() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <EventsDetailsViewSuspense />
    </Suspense>
  );
}

function EventsDetailsViewSuspense() {
  const params = useParams();
  const { locale } = useGetLocale();

  const [data] = trpc.events.getOneEvent.useSuspenseQuery({
    slug: params.slug as string
  });

  console.log('data------', data);

  return (
    <div className="m-auto max-w-5xl px-4 pt-[50px] pb-32 sm:px-6 lg:px-8">
      {locale === 'en' && data.body?.body_en && (
        <PortableText
          value={data?.body?.body_en}
          components={textEditorComponentsConfig}
        />
      )}
      {locale === 'es' && data.body?.body_es && (
        <PortableText
          value={data.body?.body_es}
          components={textEditorComponentsConfig}
        />
      )}
    </div>
  );
}
