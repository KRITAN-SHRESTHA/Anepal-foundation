'use client';

import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import CustomImage from '@/components/custom-image';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import ContainerLayout from '@/components/container-layout';
import { motion } from 'motion/react';

export default function WhoHelpUsSection() {
  const { data } =
    trpc.donorsPartners.getContentOfDonorsPartnersPage.useQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <ContainerLayout>
      <div className="py-[60px] sm:py-[100px]">
        {data?.whoHelpUsSection && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid justify-center text-center"
          >
            <EnhancedBadge
              variant="blue"
              text={data.whoHelpUsSection.badge_text}
            />
            <EnhancedTitle
              text={data.whoHelpUsSection.title}
              className="mb-0"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-muted-foreground max-w-[60ch] pt-6 text-center"
            >
              {getLocalizedString(data?.whoHelpUsSection?.description ?? [])}
            </motion.p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14"
        >
          <InfiniteSlider gap={50}>
            {data?.whoHelpUsSection.partnersName.map(partner => (
              <div className="relative h-[100px] w-[200px]" key={partner._id}>
                <CustomImage
                  className="h-full w-full object-contain"
                  src={partner.partnersLogo}
                  alt={partner.partnersName ?? ''}
                  fill
                />
              </div>
            ))}
          </InfiniteSlider>
        </motion.div>
      </div>
    </ContainerLayout>
  );
}
