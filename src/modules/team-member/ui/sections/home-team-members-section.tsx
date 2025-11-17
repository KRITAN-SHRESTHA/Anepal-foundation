'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'motion/react';

import CustomImage from '@/components/custom-image';
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';
import { PopulatedTeamMember } from '@/types/team-member-types';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import ContainerLayout from '@/components/container-layout';

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

function TeamMemberCard({
  member,
  index
}: {
  member: PopulatedTeamMember;
  index: number;
}) {
  const { getLocalizedString } = useGetLocale();
  // Social media icons
  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: member.socialMedia?.facebook
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: member.socialMedia?.twitter
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      url: member.socialMedia?.instagram
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
          <CustomImage
            src={member.image}
            alt={member.name ?? ''}
            className="h-full w-full object-cover"
            width={300}
            height={400}
            quality={100}
          />

          {/* Social Media Links - Appears on Hover from Bottom */}
          <div className="absolute right-2 bottom-2 translate-y-full opacity-0 transition-all duration-600 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex flex-col rounded-xl bg-white">
              {/* Social Icons */}
              {socialLinks.map(social => (
                <>
                  {social.url && (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 text-gray-600"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Role Badge - Positioned on Image */}
        {member.role?.name && (
          <div className="mt-4">
            <span className="inline-block rounded-md bg-white px-3 py-1.5 text-sm font-bold tracking-wide text-gray-900 capitalize">
              {getLocalizedString(member.role.name ?? [])}
            </span>
          </div>
        )}

        {/* Content */}
        <h3 className="pt-3 text-xl font-bold tracking-tight text-gray-900 uppercase lg:text-2xl">
          {member.name}
        </h3>
      </div>
    </motion.div>
  );
}
