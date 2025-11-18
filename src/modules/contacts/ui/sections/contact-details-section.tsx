'use client';

import { useTranslations } from 'next-intl';
import { ErrorBoundary } from 'react-error-boundary';

import { trpc } from '@/trpc/client';
import ContainerLayout from '@/components/container-layout';
import EnhancedTitle from '@/components/enhanced-title';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
  const t = useTranslations('ContactPage');

  return (
    <ContainerLayout className="mx-auto max-w-5xl py-20">
      <EnhancedTitle
        text={data.title}
        className="text-center text-3xl font-bold uppercase md:text-4xl lg:text-5xl"
      />

      {settingsData?.contact ? (
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          <Card className="border-0 bg-white shadow-xl">
            <div className="flex flex-col items-center">
              <div className="bg-accent-foreground/10 flex size-16 items-center justify-center rounded-full">
                <MapPin className="size-8 shrink-0" />
              </div>
              <div className="mt-3 grid text-center">
                <span className="text-2xl font-bold">{t('Address')}: </span>
                <span className="text-muted-foreground mx-auto max-w-[200px] pt-1 text-center">
                  {settingsData.contact?.address}
                </span>
              </div>
            </div>
          </Card>
          <Card className="border-0 bg-white shadow-xl">
            <div className="flex flex-col items-center">
              <div className="bg-accent-foreground/10 flex size-16 items-center justify-center rounded-full">
                <Phone className="size-8" />
              </div>
              <div className="mt-3 grid text-center">
                <span className="text-2xl font-bold">{t('Phone')}: </span>
                <a
                  href={`tel:${settingsData.contact?.phone}`}
                  className="text-muted-foreground pt-1 underline-offset-2 hover:underline"
                  aria-label={`Call us at ${settingsData?.contact?.phone}`}
                >
                  {settingsData?.contact?.phone}
                </a>
              </div>
            </div>
          </Card>
          <Card className="border-0 bg-white shadow-xl">
            <div className="flex flex-col items-center">
              <div className="bg-accent-foreground/10 flex size-16 items-center justify-center rounded-full">
                <Mail className="size-8" />
              </div>
              <div className="mt-3 grid text-center">
                <span className="text-2xl font-bold">{t('Email')}: </span>
                <a
                  href={`mailto:${settingsData?.contact?.email}`}
                  className="text-muted-foreground pt-1 underline-offset-2 hover:underline"
                >
                  {settingsData?.contact?.email}
                </a>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </ContainerLayout>
  );
}
