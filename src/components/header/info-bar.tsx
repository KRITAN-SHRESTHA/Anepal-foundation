import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { trpc } from '@/trpc/client';
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import React from 'react';
import { ContactItem } from './info-bar-item';

export default function InfoBar() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <InfoBarSuspense />
    </ErrorBoundary>
  );
}

function InfoBarSuspense() {
  const [settingsData] = trpc.settings.getSettings.useSuspenseQuery();
  const t = useTranslations('ContactPage');

  if (!settingsData) return null;

  return (
    <div className="slaptop:block hidden border-b border-gray-100 bg-gray-50">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-x-8 px-4 py-3 sm:px-6 lg:px-8">
        {/* phone number */}
        <ContactItem
          icon={<PhoneCall className="size-4" />}
          arialabel={`Call us at ${settingsData?.contact?.phone}`}
          title={t('Phone')}
          href={`tel:${settingsData?.contact?.phone}`}
          value={settingsData?.contact?.phone as string}
        />

        {/* address */}
        <ContactItem
          icon={<MapPin className="size-4" />}
          title={t('Address')}
          value={settingsData?.contact?.address as string}
        />

        {/* email */}
        <ContactItem
          icon={<Mail className="size-4" />}
          arialabel={`Mail us at ${settingsData?.contact?.email}`}
          title={t('Email')}
          href={`mailto:${settingsData?.contact?.email}`}
          value={settingsData?.contact?.email as string}
        />
      </div>
    </div>
  );
}
