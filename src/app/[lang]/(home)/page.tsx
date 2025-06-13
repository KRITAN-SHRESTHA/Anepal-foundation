import HomeView from '@/modules/home/ui/views/home-view';
import { HydrateClient, trpc } from '@/trpc/server';

// export const dynamic = 'force-dynamic';

export default async function Home() {
  await Promise.all([
    trpc.home.getBanner.prefetch(),
    trpc.home.getAboutUs.prefetch()
  ]);

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
