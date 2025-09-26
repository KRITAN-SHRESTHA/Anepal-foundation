import HomeView from '@/modules/home/ui/views/home-view';
import { HydrateClient, trpc } from '@/trpc/server';

// export const dynamic = 'force-dynamic';
export const revalidate = 300;

export default async function Home() {
  // const start = performance.now();
  await Promise.all([
    trpc.home.getBanner.prefetch(),
    trpc.header.getHeader.prefetch(),
    trpc.aboutus.getHomeAboutUs.prefetch(),
    trpc.home.getOrgHelpsInFields.prefetch(),
    trpc.home.getFeaturedProjects.prefetch(),
    trpc.home.getHomeStats.prefetch(),
    trpc.home.getHomeEventsTitle.prefetch(),
    trpc.home.getHomeTestimonials.prefetch(),
    trpc.home.getHomeTeamMembers.prefetch(),
    trpc.home.getHomePartners.prefetch(),
    trpc.home.getHomeGallery.prefetch(),
    trpc.settings.getSettings.prefetch(),
    trpc.events.getFeaturedHomeEvents.prefetch(),
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
