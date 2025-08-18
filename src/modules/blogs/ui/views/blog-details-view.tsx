'use client';

import { notFound, useParams } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import EditorPortableText from '@/components/EditorPortableText';
import { Badge } from '@/components/ui/badge';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';

import BlogDetailsSkeleton from '../components/blogs-details-skeleton';
import BlogDetailsHeaderSection from '../sections/blog-details-header-section';

export default function BlogsDetailsView() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<BlogDetailsSkeleton />}>
        <BlogsDetailsViewSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function BlogsDetailsViewSuspense() {
  const params = useParams();
  const { locale } = useGetLocale();
  const { getLocalizedString } = useGetLocale();

  const [data] = trpc.blogs.getOneBlog.useSuspenseQuery({
    slug: params.slug as string
  });

  if (!data) return notFound();

  return (
    <>
      <div className="m-auto max-w-6xl px-4 pt-[50px] pb-32 sm:px-6 lg:px-8">
        <BlogDetailsHeaderSection data={data} />
        <div className="m-auto max-w-3xl">
          <Badge className="">{getLocalizedString(data?.tag.name ?? [])}</Badge>
          {locale === 'en' && data?.content?.content_en && (
            <EditorPortableText value={data.content.content_en} />
          )}
          {locale === 'es' && data?.content?.content_es && (
            <EditorPortableText value={data.content?.content_es} />
          )}
        </div>
      </div>
    </>
  );
}
