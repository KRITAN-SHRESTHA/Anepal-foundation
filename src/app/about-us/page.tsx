import AboutView from '@/modules/about/ui/views/about-view';
import { HydrateClient, trpc } from '@/trpc/server';

export default async function AboutUsPage() {
  // const start = performance.now();
  await Promise.all([
    trpc.aboutus.getAboutUs.prefetch(),
    trpc.settings.getSettings.prefetch(),
    trpc.teamMember.getAboutTeamMembers.prefetch()
  ]);
  // const end = performance.now();
  // console.log(`⏱ GROQ query took: ${Math.round(end - start)} ms`);
  return (
    <HydrateClient>
      <AboutView />
    </HydrateClient>
  );
}
