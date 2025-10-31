'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { trpc } from '@/trpc/client';

import MembersListSection from '../sections/members-list-section';
import TeamMemberPageSkeleton from '../components/team-member-page-skeleton';
import HeroSectionTwo from '@/components/hero-section-2';

export default function TeamMemberView() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback={<TeamMemberPageSkeleton />}>
        <TeamMemberViewSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function TeamMemberViewSuspense() {
  const [teamMembers] = trpc.teamMember.getAboutTeamMembers.useSuspenseQuery();

  if (!teamMembers) return <div>There is no data added yet.</div>;

  return (
    <div>
      {teamMembers.heroSection?.backgroundImage && (
        <HeroSectionTwo
          image={teamMembers.heroSection?.backgroundImage}
          title={teamMembers.heroSection.title}
        />
      )}

      <MembersListSection />
    </div>
  );
}
