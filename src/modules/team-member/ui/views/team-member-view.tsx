'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import HeroSection from '@/components/hero-section';
import { trpc } from '@/trpc/client';

import MembersListSection from '../sections/members-list-section';

export default function TeamMemberView() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading....">
        <TeamMemberViewSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function TeamMemberViewSuspense() {
  const [teamaMembers] = trpc.teamMember.getAboutTeamMembers.useSuspenseQuery();

  return (
    <div>
      {teamaMembers.heroimage && (
        <HeroSection
          image={teamaMembers.heroimage}
          boldTitle="Team"
          normalTitle="Member"
          alt={teamaMembers.heroimage.alt ?? ''}
        />
      )}

      <MembersListSection />
    </div>
  );
}
