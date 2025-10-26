import TeamMemberView from '@/modules/team-member/ui/views/team-member-view';
import { HydrateClient, trpc } from '@/trpc/server';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TeamMemberPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  void trpc.teamMember.getAboutTeamMembers.prefetch();

  return (
    <HydrateClient>
      <TeamMemberView />
    </HydrateClient>
  );
}
