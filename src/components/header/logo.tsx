import { urlFor } from '@/sanity/lib/image';
import { trpc } from '@/trpc/client';
import Image from 'next/image';
import React from 'react';

export default function Logo() {
  const [settings] = trpc.settings.getSettings.useSuspenseQuery();

  const settingsData = settings[0];

  return (
    <div className="relative h-[56px] w-[100px] shrink-0">
      {settingsData.logo && (
        <Image
          src={urlFor(settingsData.logo).quality(100).url()}
          alt="Anepal-foundation-logo"
          sizes="20vw"
          fill
          className="h-full w-full"
          quality={100}
        />
      )}
    </div>
  );
}
