'use client';

import { trpc } from '@/trpc/client';

import useGetLocale from '@/hooks/use-get-locale';
import { TeamMemberCard } from '@/components/team-member-card';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';

export default function MembersListSection() {
  const { data } = trpc.teamMember.getAboutTeamMembers.useQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-[80px] pb-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <EnhancedBadge text={data?.membersDetails.subtitle} variant="pink" />
        <EnhancedTitle text={data?.membersDetails.title} />

        <p className="text-muted-foreground mt-6 mb-8">
          {getLocalizedString(data?.membersDetails.description ?? [])}
        </p>
      </div>
      <div className="mt-20 flex flex-wrap justify-center gap-8 gap-y-20">
        {data?.membersDetails?.membersList?.map((member, index) => (
          <div
            key={member._id}
            className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(30%-1.5rem)]"
          >
            <TeamMemberCard index={index} member={member} showIntro />
          </div>
        ))}
      </div>
    </section>
  );
}
