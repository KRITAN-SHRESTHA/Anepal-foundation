import React from 'react';

import { HydrateClient, trpc } from '@/trpc/server';

import FooterContent from './footer-content';

export default async function Footer() {
  void trpc.settings.getSettings.prefetch();

  return (
    <HydrateClient>
      <FooterContent />
    </HydrateClient>
  );
}
