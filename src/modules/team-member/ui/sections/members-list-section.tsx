'use client';

import { trpc } from '@/trpc/client';

import ContentTitle from '@/components/content-title';
import useGetLocale from '@/hooks/use-get-locale';

import TeamMemberCard from '../components/team-member-card';

export default function MembersListSection() {
  const { data } = trpc.teamMember.getAboutTeamMembers.useQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-[80px] pb-32 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start text-left">
        <ContentTitle
          title={data?.membersDetails.title}
          subtitle={data?.membersDetails.subtitle}
          highlightTitleText={data?.membersDetails.highlightTitle}
        />
        <p className="text-muted-foreground mt-6 mb-8 max-w-3xl">
          {getLocalizedString(data?.membersDetails.description ?? [])}
        </p>
      </div>
      <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-12 sm:gap-y-16 lg:grid-cols-3">
        {data?.membersDetails?.membersList?.map(member => (
          <TeamMemberCard key={member._id} {...member} />
        ))}
      </div>
    </section>
  );
}
