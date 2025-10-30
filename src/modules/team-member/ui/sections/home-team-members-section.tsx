'use client';

import { ChevronRight } from 'lucide-react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ContentTitle from '@/components/content-title';
import NavigationLink from '@/components/navigation-link';
import TeamMemberCard from '@/components/team-member-card';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';
import Image from 'next/image';

export default function HomeTeamMembersSection() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading....">
        <HomeTeamMembersSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function HomeTeamMembersSectionSuspense() {
  const [teamMember] = trpc.home.getHomeTeamMembers.useSuspenseQuery();

  if (!teamMember) return null;

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="pointer-events-none absolute top-0 -right-[100px] h-full w-[600px] select-none">
        <Image
          src={'/assets/background/causes_img.png'}
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="relative mx-auto max-w-[1000px] text-center">
        <ContentTitle
          subtitle={teamMember.subtitle}
          title={teamMember.title}
          description={teamMember.short_description}
          highlightTitleText={teamMember.highlightTitle}
        />

        <Button
          asChild
          variant="outline"
          className="mt-4 rounded-full !px-5 pr-2"
          border={'purple'}
        >
          <NavigationLink href="/our-team">
            Read more
            <ChevronRight className="opacity-50" />
          </NavigationLink>
        </Button>
      </div>
      <div className="relative mx-auto mt-10 flex max-w-3xl flex-col gap-5 gap-y-10 md:mt-20">
        <div className="flex flex-wrap justify-center gap-10 md:gap-15">
          {teamMember?.membersList?.map(member => (
            <div key={member._id} className="w-full max-w-[200px] grow">
              <TeamMemberCard key={member._id} {...member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
