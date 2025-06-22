import TeamMemberView from '@/modules/team-member/ui/views/team-member-view';
import { HydrateClient, trpc } from '@/trpc/server';

export default async function TeamMemberPage() {
  void trpc.teamMember.getAboutTeamMembers.prefetch();

  return (
    <HydrateClient>
      <TeamMemberView />
    </HydrateClient>
  );
}
