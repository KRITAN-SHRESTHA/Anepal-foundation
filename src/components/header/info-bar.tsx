import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { trpc } from '@/trpc/client';
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import React from 'react';
import { ContactItem } from './info-bar-item';
import { motion } from 'motion/react';

function ErrorFallback() {
  const t = useTranslations('Default');
  return <div>{t('Something_went_wrong')}</div>;
}

export default function InfoBar() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <InfoBarSuspense />
    </ErrorBoundary>
  );
}

function InfoBarSuspense() {
  const [settingsData] = trpc.settings.getSettings.useSuspenseQuery();
  const t = useTranslations('ContactPage');

  if (!settingsData) return null;

  return (
    <motion.div
      className="slaptop:block hidden border-b border-gray-100 bg-gray-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-x-8 px-4 py-3 sm:px-6 lg:px-8">
        {/* phone number */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <ContactItem
            icon={<PhoneCall className="size-4" />}
            arialabel={`Call us at ${settingsData?.contact?.phone}`}
            title={t('Phone')}
            href={`tel:${settingsData?.contact?.phone}`}
            value={settingsData?.contact?.phone as string}
          />
        </motion.div>

        {/* address */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <ContactItem
            icon={<MapPin className="size-4" />}
            title={t('Address')}
            value={settingsData?.contact?.address as string}
          />
        </motion.div>

        {/* email */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <ContactItem
            icon={<Mail className="size-4" />}
            arialabel={`Mail us at ${settingsData?.contact?.email}`}
            title={t('Email')}
            href={`mailto:${settingsData?.contact?.email}`}
            value={settingsData?.contact?.email as string}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
