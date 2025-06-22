import AboutView from '@/modules/about/ui/views/about-view';
import { HydrateClient, trpc } from '@/trpc/server';

export default async function AboutUsPage() {
  void trpc.aboutus.getAboutUs.prefetch();
  return (
    <HydrateClient>
      <AboutView />
    </HydrateClient>
  );
}
