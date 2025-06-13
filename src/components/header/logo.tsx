import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { trpc } from '@/trpc/client';
import Image from 'next/image';
import React from 'react';

export default function Logo({
  className
}: React.HTMLAttributes<HTMLDivElement>) {
  const [settings] = trpc.settings.getSettings.useSuspenseQuery();

  return (
    <div className={cn('relative h-[56px] w-[100px] shrink-0', className)}>
      {settings.logo && (
        <Image
          src={urlFor(settings.logo).quality(100).url()}
          alt="Anepal Organization logo"
          sizes="20vw"
          fill
          className="h-full w-full mix-blend-multiply"
          quality={100}
        />
      )}
    </div>
  );
}
