'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'motion/react';

import CustomImage from '@/components/custom-image';
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';
import { PopulatedTeamMember } from '@/types/team-member-types';

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

  const subtitle = getLocalizedString(teamMember?.subtitle ?? []);
  const highlightTitle = getLocalizedString(teamMember?.highlightTitle ?? []);
  const title = getLocalizedString(teamMember?.title ?? []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 lg:py-32">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          {/* Badge */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block"
            >
              <span className="inline-flex items-center rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-900 uppercase">
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase sm:text-4xl lg:text-5xl"
          >
            {highlightTitle && <span>{highlightTitle} </span>}
            {title}
          </motion.h2>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMember?.membersList?.map((member, index) => (
            <TeamMemberCard key={member._id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamMemberCard({
  member,
  index
}: {
  member: PopulatedTeamMember;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        {/* Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
          <CustomImage
            src={member.image}
            alt={member.name ?? ''}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            width={300}
            height={400}
          />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Role Badge */}
          {member.role?.name && (
            <div className="mb-3 inline-block">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold tracking-wide text-gray-700 uppercase">
                {member.role.name}
              </span>
            </div>
          )}

          {/* Name */}
          <h3 className="text-xl font-extrabold tracking-tight text-gray-900 uppercase">
            {member.name}
          </h3>
        </div>

        {/* Hover Effect */}
        <div className="bg-accent-foreground absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full" />
      </div>
    </motion.div>
  );
}
