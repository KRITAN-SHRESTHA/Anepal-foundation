'use client';

import { usePathname } from 'next/navigation';

import { trpc } from '@/trpc/client';
import { useTranslations } from 'next-intl';

// export default function InfoBar() {
//   return (
//     <ErrorBoundary fallback={<div>Something went wrong</div>}>
//       <InfoBarSuspense />
//     </ErrorBoundary>
//   );
// }

export default function InfoBar() {
  const pathname = usePathname();
  const [settingsData] = trpc.settings.getSettings.useSuspenseQuery();
  const t = useTranslations('ContactPage');

  if (pathname.includes('/studio')) {
    return null;
  }
  return (
    <div className="bg-accent hidden lg:block">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-x-9 px-4 py-2 sm:px-6 lg:px-8">
        {/* phone number */}
        <div className="flex items-center">
          <span className="text-xs">{t('Phone')}:</span>
          <a
            href={`tel:${settingsData.contact?.phone}`}
            className="ml-1 text-sm leading-[100%] font-medium"
            aria-label={`Call us at ${settingsData.contact?.phone}`}
          >
            {settingsData.contact?.phone}
          </a>
        </div>
        {/* address */}
        <div className="flex items-center">
          <span className="text-xs">{t('Address')}:</span>
          <p className="ml-1 text-sm leading-[100%] font-medium">
            {settingsData.contact?.address}
          </p>
        </div>
        {/* email */}
        <div className="flex items-center">
          <span className="text-xs">{t('Email')}:</span>
          <a
            href={`mailto:${settingsData.contact?.email}`}
            className="ml-1 text-sm leading-[100%] font-medium"
          >
            {settingsData.contact?.email}
          </a>
        </div>
      </div>
    </div>
  );
}
