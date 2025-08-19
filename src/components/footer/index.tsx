import React from 'react';

import { HydrateClient, trpc } from '@/trpc/server';

import FooterContent from './footer-content';

export default async function Footer() {
  await Promise.all([
    void trpc.settings.getSettings.prefetch(),
    void trpc.header.getHeader.prefetch()
  ]);

  return (
    <HydrateClient>
      <FooterContent />
    </HydrateClient>
  );
}
