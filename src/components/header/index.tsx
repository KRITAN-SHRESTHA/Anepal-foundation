import { HydrateClient, trpc } from '@/trpc/server';

import HeaderClient from './header';
import InfoBar from './info-bar';

export default async function Header() {
  await Promise.all([
    void trpc.header.getHeader.prefetch(),
    void trpc.settings.getSettings.prefetch()
  ]);

  return (
    <HydrateClient>
      <InfoBar />
      <HeaderClient />
    </HydrateClient>
  );
}
