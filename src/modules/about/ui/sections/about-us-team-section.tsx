'use client';

import TeamMemberCard from '@/components/team-member-card';
import { trpc } from '@/trpc/client';
import React from 'react';

export default function AboutUsTeamSection() {
  const [aboutTeamMembers] =
    trpc.teamMember.getAboutTeamMembers.useSuspenseQuery();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-[40px] sm:px-6 md:py-[60px] lg:px-8">
      <div className="mx-auto max-w-[1000px] text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Meet Our Team
        </h2>
      </div>
      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-5 gap-y-10 md:mt-20">
        <div className="flex flex-wrap justify-center gap-7">
          {aboutTeamMembers.membersList?.map(member => (
            <div key={member.name} className="w-full max-w-[200px] grow">
              <TeamMemberCard key={member.name} {...member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
