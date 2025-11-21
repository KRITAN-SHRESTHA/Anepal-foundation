'use client';

import React from 'react';
import { trpc } from '@/trpc/client';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

function ErrorFallback() {
  const t = useTranslations('Default');
  return <div>{t('Something_went_wrong')}</div>;
}

export default function ContactMap() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ContactMapSuspense />
    </ErrorBoundary>
  );
}

function ContactMapSuspense() {
  const [data] = trpc.settings.getSettings.useSuspenseQuery();

  if (!data?.contact?.map_embedded_link) return null;

  return (
    <motion.div
      className="bg-muted/50 flex h-[450px] items-center justify-center rounded-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <iframe
        src={data?.contact?.map_embedded_link}
        className="h-[450px] w-full"
        loading="lazy"
      ></iframe>
    </motion.div>
  );
}
