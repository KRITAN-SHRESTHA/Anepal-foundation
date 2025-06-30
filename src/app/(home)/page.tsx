import HomeView from '@/modules/home/ui/views/home-view';
import { HydrateClient, trpc } from '@/trpc/server';

// export const dynamic = 'force-dynamic';

export default async function Home() {
  // const start = performance.now();
  await Promise.all([
    trpc.home.getBanner.prefetch(),
    trpc.aboutus.getHomeAboutUs.prefetch(),
    trpc.home.getOrgHelpsInFields.prefetch(),
    trpc.home.getWhatMakesUsUnique.prefetch(),
    trpc.settings.getSettings.prefetch(),
    trpc.events.getFeaturedEvents.prefetch(),
    trpc.teamMember.getAboutTeamMembers.prefetch()
  ]);
  // const end = performance.now();
  // console.log(`⏱ GROQ query took: ${Math.round(end - start)} ms`);
  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
