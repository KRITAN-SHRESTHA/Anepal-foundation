import HomeView from '@/modules/home/ui/views/home-view';
import { HydrateClient, trpc } from '@/trpc/server';

export default async function Home() {
  void trpc.home.getBanner.prefetch();

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
