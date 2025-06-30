import React from 'react';

import { HydrateClient, trpc } from '@/trpc/server';

import FooterContent from './footer-content';
import Image from 'next/image';

export default async function Footer() {
  void trpc.settings.getSettings.prefetch();

  return (
    <HydrateClient>
      <div className="relative h-[180px] w-full">
        <Image
          className="w-full object-contain"
          src={'/assets/bottom-bg.png'}
          alt=""
          quality={100}
          fill
        />
      </div>
      <FooterContent />
    </HydrateClient>
  );
}
