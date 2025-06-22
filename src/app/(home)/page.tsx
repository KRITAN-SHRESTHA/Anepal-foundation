import HomeView from '@/modules/home/ui/views/home-view';
import { HydrateClient, trpc } from '@/trpc/server';

// export const dynamic = 'force-dynamic';

export default async function Home() {
  await Promise.all([
    trpc.home.getBanner.prefetch(),
    trpc.aboutus.getHomeAboutUs.prefetch(),
    trpc.home.getWhatMakesUsUnique.prefetch(),
    trpc.settings.getSettings.prefetch(),
    trpc.events.getFeaturedEvents.prefetch(),
    trpc.teamMember.getAboutTeamMembers.prefetch()
  ]);

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
