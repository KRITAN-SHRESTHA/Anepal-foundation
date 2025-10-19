import AboutView from '@/modules/about/ui/views/about-view';
import { HydrateClient, trpc } from '@/trpc/server';

export default async function AboutUsPage() {
  await Promise.all([
    trpc.aboutus.getAboutUs.prefetch(),
    trpc.settings.getSettings.prefetch(),
    trpc.teamMember.getAboutTeamMembers.prefetch()
  ]);
  return (
    <HydrateClient>
      <AboutView />
    </HydrateClient>
  );
}
