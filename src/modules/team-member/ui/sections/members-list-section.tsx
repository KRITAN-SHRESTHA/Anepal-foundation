'use client';

import { trpc } from '@/trpc/client';

import ContentTitle from '@/components/content-title';

import TeamMemberCard from '../components/team-member-card';

export default function MembersListSection() {
  const [teamaMembers] = trpc.teamMember.getAboutTeamMembers.useSuspenseQuery();

  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-[80px] pb-32 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start text-left">
        {/* title */}
        {/* Support a Brighter Future Give Hope,
      Change Lives Your Gift Makes a
      Difference Empower Children in Nepal
      Join Us in Making an Impact */}
        {/* subtitle */}
        {/* Every donation helps transform a life.
      Together, we can create lasting change.
      Your generosity fuels our mission.
      Small acts, big impact.
      Be the reason someone smiles today. */}
        <ContentTitle
          title={'Support a Brighter Future'}
          subtitle={'Your generosity fuels our mission'}
        />
        <p className="text-muted-foreground mt-6 mb-8 max-w-3xl">
          100% of your donation goes to programs that uplift communities and
          change lives. Join our community of supporters and help us make a real
          difference.
        </p>
      </div>
      <div className="mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
        {teamaMembers.membersList?.map(member => (
          <TeamMemberCard key={member._id} {...member} />
        ))}
      </div>
    </section>
  );
}
