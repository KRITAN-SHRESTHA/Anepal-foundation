'use client';

import { trpc } from '@/trpc/client';

import useGetLocale from '@/hooks/use-get-locale';
import { TeamMemberCard } from '@/components/team-member-card';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import { motion } from 'motion/react';

export default function MembersListSection() {
  const { data } = trpc.teamMember.getAboutTeamMembers.useQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-[80px] pb-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <EnhancedBadge text={data?.badge_text} variant="pink" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <EnhancedTitle text={data?.title} />
        </motion.div>

        <motion.p
          className="text-muted-foreground mt-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          {getLocalizedString(data?.description ?? [])}
        </motion.p>
      </div>
      <div className="mt-20 flex flex-wrap justify-center gap-8 gap-y-20">
        {data?.membersList?.map((member, index) => (
          <motion.div
            key={member._id}
            className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(30%-1.5rem)]"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: 'easeOut'
            }}
          >
            <TeamMemberCard index={index} member={member} showIntro />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
