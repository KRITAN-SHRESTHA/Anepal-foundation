'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import ContainerLayout from '@/components/container-layout';
import { TeamMemberCard } from '@/components/team-member-card';

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
  const { getLocalizedString } = useGetLocale();

  if (!teamMember) return null;

  const badge_text = getLocalizedString(teamMember?.badge_text ?? []);
  const title = getLocalizedString(teamMember?.title ?? []);

  return (
    <section className="relative overflow-hidden bg-[#bbdff5]/40 py-20 lg:py-32">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <ContainerLayout>
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          {/* Badge */}
          <EnhancedBadge text={badge_text} variant="pink" />
          {/* Title */}
          <EnhancedTitle text={title} />
        </div>

        {/* Team Members Flex Layout */}
        <div className="flex flex-wrap justify-center gap-8 gap-y-12">
          {teamMember?.membersList?.map((member, index) => (
            <div
              key={member._id}
              className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(30%-1.5rem)]"
            >
              <TeamMemberCard member={member} index={index} />
            </div>
          ))}
        </div>
      </ContainerLayout>
    </section>
  );
}
