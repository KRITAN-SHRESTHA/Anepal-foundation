'use client';

import ContentTitle from '@/components/content-title';
import TeamMemberCard from '@/components/team-member-card';
import { trpc } from '@/trpc/client';

export default function AboutUsTeamSection() {
  const { data } = trpc.aboutus.getAboutUs.useQuery();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-[40px] sm:px-6 md:py-[60px] lg:px-8">
      <ContentTitle
        title={data?.teamsSection.title}
        subtitle={data?.teamsSection.subtitle}
        highlightTitleText={data?.teamsSection?.highlightTitle}
        align="center"
      />
      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-5 gap-y-10 md:mt-20">
        <div className="flex flex-wrap justify-center gap-7">
          {data?.teamsSection.teamMembers.map(member => (
            <div key={member.name} className="w-full max-w-[200px] grow">
              <TeamMemberCard key={member.name} {...member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
