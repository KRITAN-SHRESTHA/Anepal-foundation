'use client';

import { notFound, useParams } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'motion/react';
import EditorPortableText from '@/components/EditorPortableText';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';

import BlogDetailsSkeleton from '../components/blogs-details-skeleton';
import BlogDetailsHeaderSection from '../sections/blog-details-header-section';
import BlogDetailsHeroSection from '../sections/blog-details-hero-section';

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

  const [data] = trpc.blogs.getOneBlog.useSuspenseQuery({
    slug: decodeURIComponent(params.slug as string)
  });
  console.log('🚀 ~ BlogsDetailsViewSuspense ~ data:', data);

  if (!data) return notFound();

  return (
    <>
      <BlogDetailsHeroSection
        variant="pink"
        title={data.title}
        parentLink="/blogs"
        parentName="Our blogs"
      />
      <div className="m-auto max-w-[1340px] px-4 pt-[50px] pb-32 sm:px-6 lg:px-8">
        <BlogDetailsHeaderSection data={data} />
        <motion.div
          className="m-auto max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {locale === 'en' && data?.content?.content_en && (
            <EditorPortableText value={data.content.content_en} />
          )}
          {locale === 'es' && data?.content?.content_es && (
            <EditorPortableText value={data.content?.content_es} />
          )}
        </motion.div>
      </div>
    </>
  );
}
