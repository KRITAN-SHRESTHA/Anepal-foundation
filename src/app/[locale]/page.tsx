import HomeView from '@/modules/home/ui/views/home-view';
import { HydrateClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

// export const dynamic = 'force-dynamic';
// export const dynamic = 'force-dynamic';
export const revalidate = 300;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
