import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import { motion } from 'motion/react';

export default function StatsSection() {
  const { data } =
    trpc.donorsPartners.getContentOfDonorsPartnersPage.useQuery();
  const { getLocalizedString } = useGetLocale();

  return (
    <div className="py-[60px] sm:py-[100px]">
      {/* Stats Section */}
      <div className="tablet:flex-row tablet:items-center mb-20 flex flex-col justify-between gap-9">
        {data?.statisticsSection && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <EnhancedBadge
              variant="yellow"
              text={data.statisticsSection.badge_text}
              className="mb-2"
            />
            <EnhancedTitle
              text={data.statisticsSection.title}
              className="mb-0"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-muted-foreground tablet:max-w-[60ch] pt-6"
            >
              {getLocalizedString(data?.statisticsSection?.description ?? [])}
            </motion.p>
          </motion.div>
        )}
        <div className="xs:flex-nowrap flex flex-wrap gap-x-[60px] gap-y-[30px]">
          {data?.statisticsSection?.statistics?.map((stat, index) => (
            <motion.div
              key={stat._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h3 className="text-center text-xl font-extrabold whitespace-nowrap">
                {getLocalizedString(stat.label ?? [])}
              </h3>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                className="xs:text-[80px] text-[70px] font-extrabold text-gray-900 lg:text-[100px]"
              >
                {stat.value}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
