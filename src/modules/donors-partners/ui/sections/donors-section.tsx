import ContainerLayout from '@/components/container-layout';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { trpc } from '@/trpc/client';
import React from 'react';
import { motion } from 'motion/react';

export default function DonorsSection() {
  const { data } =
    trpc.donorsPartners.getContentOfDonorsPartnersPage.useQuery();

  return (
    <ContainerLayout>
      <div className="mt-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 max-w-4xl text-center"
        >
          <EnhancedBadge
            variant="pink"
            text={data?.donors_section.badge_text}
          />
          <EnhancedTitle
            text={data?.donors_section.title}
            className="text-balance"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="pt-10"
        >
          <InfiniteSlider gap={50} reverse>
            {data?.donors_section.donors_names.map(donor => (
              <div key={donor._id} className="p-4 text-center">
                <p className="text-lg font-bold text-gray-800">
                  {donor.donorsName}
                </p>
              </div>
            ))}
          </InfiniteSlider>
          <InfiniteSlider gap={50}>
            {data?.donors_section.donors_names.map(donor => (
              <div key={donor._id} className="p-4 text-center">
                <p className="text-lg font-bold text-gray-800">
                  {donor.donorsName}
                </p>
              </div>
            ))}
          </InfiniteSlider>
        </motion.div>
      </div>
    </ContainerLayout>
  );
}
