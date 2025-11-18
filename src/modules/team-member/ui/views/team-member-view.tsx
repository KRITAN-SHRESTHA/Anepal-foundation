'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { trpc } from '@/trpc/client';

import MembersListSection from '../sections/members-list-section';
import TeamMemberPageSkeleton from '../components/team-member-page-skeleton';
import HeroSectionThree from '@/components/hero-section-three';

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
  const [data] = trpc.teamMember.getAboutTeamMembers.useSuspenseQuery();

  if (!data) return <div>There is no data added yet.</div>;

  return (
    <div>
      <HeroSectionThree title={data.heroSection?.title} variant="skyblue" />

      <MembersListSection />
    </div>
  );
}
