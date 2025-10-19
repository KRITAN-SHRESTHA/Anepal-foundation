import AboutView from '@/modules/about/ui/views/about-view';
import { HydrateClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutUsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
