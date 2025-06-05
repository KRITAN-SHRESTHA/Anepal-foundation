'use client';

import { trpc } from '@/trpc/client';
import { usePathname } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';

export default function InfoBar() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {/* <Suspense fallback={<h1>Loading....</h1>}> */}
      <InfoBarSuspense />
      {/* </Suspense> */}
    </ErrorBoundary>
  );
}

function InfoBarSuspense() {
  const pathname = usePathname();
  const [settings] = trpc.settings.getSettings.useSuspenseQuery();

  const settingsData = settings[0];

  if (pathname.includes('/studio')) {
    return null;
  }
  return (
    <div className="bg-accent hidden lg:block">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-x-9 px-4 py-2 sm:px-6 lg:px-8">
        {/* phone number */}
        <div className="flex items-center">
          <span className="text-xs">Phone number:</span>
          <a
            href={`tel:${settingsData.contact?.phone}`}
            className="ml-1 text-sm leading-[100%] font-medium"
          >
            {settingsData.contact?.phone}
          </a>
        </div>
        {/* address */}
        <div className="flex items-center">
          <span className="text-xs">Address:</span>
          <p className="ml-1 text-sm leading-[100%] font-medium">
            {settingsData.contact?.address}
          </p>
        </div>
        {/* email */}
        <div className="flex items-center">
          <span className="text-xs">Email:</span>
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
