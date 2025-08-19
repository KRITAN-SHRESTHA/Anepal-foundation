'use client';

import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

export default function ContactDetailsSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ContactDetailsSectionSuspense />
    </ErrorBoundary>
  );
}

function ContactDetailsSectionSuspense() {
  const [settingsData] = trpc.settings.getSettings.useSuspenseQuery();
  const [data] = trpc.contact.getContactPage.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();
  const t = useTranslations('ContactPage');

  return (
    <div className="mx-auto flex max-w-sm flex-col justify-between gap-10 md:max-w-xs lg:max-w-sm">
      <div className="text-center md:text-left">
        <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
          {getLocalizedString(data.title ?? [])}
        </h1>
        <p className="text-muted-foreground">
          {getLocalizedString(data.subtitle ?? [])}
        </p>
      </div>
      <div className="mx-auto w-fit md:mx-0">
        <h3 className="mb-6 text-center text-2xl font-semibold md:text-left">
          {t('Contact_Details')}
        </h3>
        <ul className="ml-4 list-disc">
          <li>
            <span className="font-bold">{t('Phone')}: </span>
            <a
              href={`tel:${settingsData.contact?.phone}`}
              className="underline-offset-2 hover:underline"
              aria-label={`Call us at ${settingsData.contact?.phone}`}
            >
              {settingsData.contact?.phone}
            </a>
          </li>
          <li>
            <span className="font-bold">{t('Email')}: </span>
            <a
              href={`mailto:${settingsData.contact?.email}`}
              // className="underline"
              className="underline-offset-2 hover:underline"
            >
              {settingsData.contact?.email}
            </a>
          </li>
          <li>
            <span className="font-bold">{t('Address')}: </span>
            {settingsData.contact?.address}
          </li>
        </ul>
      </div>
    </div>
  );
}
