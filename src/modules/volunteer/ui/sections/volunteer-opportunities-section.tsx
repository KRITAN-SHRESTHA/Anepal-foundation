'use client';

import ContainerLayout from '@/components/container-layout';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import { motion } from 'motion/react';
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';
import CustomImage from '@/components/custom-image';

export default function VolunteerOpportunitiesSection() {
  const [data] = trpc.volunteer.getVolunteerView.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  if (!data?.opportunitiesSection) return null;

  const { badge_text, opportunities, title } = data.opportunitiesSection;

  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500'
  ];

  return (
    <section className="relative bg-white py-20 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

      <ContainerLayout>
        <div className="relative">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
            <EnhancedBadge
              text={
                getLocalizedString(badge_text ?? []) ||
                'Volunteer Opportunities'
              }
              variant="pink"
            />
            <EnhancedTitle
              text={
                getLocalizedString(title ?? []) || 'Choose How You Want to Help'
              }
              className="text-balance"
            />
          </div>

          {/* Opportunities Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities?.map((opportunity, index) => {
              const oppTitle = getLocalizedString(opportunity?.title ?? []);
              const oppDescription =
                getLocalizedString(opportunity?.description ?? []) || '';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
                    {/* Icon */}
                    <div className="mb-6 inline-flex">
                      {opportunity?.image && (
                        <CustomImage
                          src={opportunity.image}
                          alt={oppTitle!}
                          width={102}
                          height={102}
                          className="size-[100px] object-contain"
                        />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mb-4 text-2xl font-black tracking-tight text-gray-900 uppercase">
                      {oppTitle}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 text-sm leading-relaxed text-gray-600 lg:text-base">
                      {oppDescription}
                    </p>

                    {/* Decorative corner accent */}
                    <div
                      className={`absolute -top-2 -right-2 size-20 rounded-full bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
}
