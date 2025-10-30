'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import HeroSection from '@/components/hero-section';
import { trpc } from '@/trpc/client';

import MembersListSection from '../sections/members-list-section';
import TeamMemberPageSkeleton from '../components/team-member-page-skeleton';

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
        <HeroSection
          image={teamMembers.heroSection?.backgroundImage}
          subtitle={teamMembers.heroSection.subtitle}
          highlightTitleText={teamMembers.heroSection.highlightTitle}
          title={teamMembers.heroSection.title}
        />
      )}

      <MembersListSection />
    </div>
  );
}
