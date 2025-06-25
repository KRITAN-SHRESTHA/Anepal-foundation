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
  const [teamMembers] = trpc.teamMember.getAboutTeamMembers.useSuspenseQuery();

  return (
    <div>
      {teamMembers.heroSection?.backgroundImage && (
        <HeroSection
          image={teamMembers.heroSection?.backgroundImage}
          subtitle={teamMembers.heroSection.subtitle}
          title={teamMembers.heroSection.title}
          alt={teamMembers.heroSection?.backgroundImage.alt ?? ''}
        />
      )}

      <MembersListSection />
    </div>
  );
}
