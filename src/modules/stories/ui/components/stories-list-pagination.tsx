'use client';

import React, { Suspense } from 'react';

import PaginationComponent from '@/components/pagination-component';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import useGetAllStories from '../hooks/use-get-all-stories';

function LoadingFallback() {
  const t = useTranslations('Default');
  return <h1>{t('Loading')}</h1>;
}

export default function StoriesListPagination() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <StoriesListPaginationSuspense />
    </Suspense>
  );
}

function StoriesListPaginationSuspense() {
  const {
    pagination: { page: currentPage, total, totalPages },
    stories
  } = useGetAllStories();

  if (totalPages === 1) return null;
  if (stories.length === 0) return null;

  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <PaginationComponent
        currentPage={currentPage}
        total={total}
        totalPages={totalPages}
      />
    </motion.div>
  );
}
