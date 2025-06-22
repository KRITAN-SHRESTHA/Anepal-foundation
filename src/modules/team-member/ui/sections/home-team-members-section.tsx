'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ContentTitle from '@/components/content-title';
import TeamMemberCard from '@/components/team-member-card';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';

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
  const [aboutTeamMembers] =
    trpc.teamMember.getAboutTeamMembers.useSuspenseQuery();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="mx-auto max-w-[1000px] text-center">
        {/* Meet Our Team */}

        <ContentTitle subtitle={'NUESTRO EQUIPO'} />
        <p className="text-muted-foreground pt-10 text-base sm:text-lg">
          Nuestro equipo está formado por personas que alternan su labor
          profesional con el trabajo para la Fundación. Nuestro objetivo es
          hacer de este mundo un lugar mejor y por eso trabajamos con ilusión,
          constancia y compromiso. Formamos un buen equipo, dinámico y
          organizado en el que a cada miembro se le asigna una competencia para
          que este trabajo sea lo más fructífero posible.
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-4 rounded-full !px-5 pr-2"
          border={'purple'}
        >
          <Link href="/team-member">
            Read more
            <ChevronRight className="opacity-50" />
          </Link>
        </Button>
      </div>
      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-5 gap-y-10 md:mt-20">
        <div className="flex flex-wrap justify-center gap-7">
          {aboutTeamMembers?.membersList?.map(member => (
            <div key={member._id} className="w-full max-w-[200px] grow">
              <TeamMemberCard key={member._id} {...member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
