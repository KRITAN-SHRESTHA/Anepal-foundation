import ContainerLayout from '@/components/container-layout';
import CustomImage from '@/components/custom-image';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import { motion } from 'motion/react';
import React from 'react';

export default function WhyChooseSection() {
  const { data } = trpc.aboutus.getAboutUs.useQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <ContainerLayout className="py-20 md:py-30">
      <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-2">
        {/* left content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <EnhancedBadge
              text={data?.whyChooseSection?.badge_text}
              variant="green"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <EnhancedTitle
              text={data?.whyChooseSection?.title}
              className="mb-0"
            />
          </motion.div>
        </motion.div>
        {/* right content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <p className="text-muted-foreground text-lg lg:text-2xl">
            We are a national charity working to transform the hopes and
            happiness of young people facing abuse, exploitation and neglect.
          </p>
        </motion.div>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {data?.whyChooseSection?.items?.map((d, index) => (
          <motion.div
            key={getLocalizedString(d.title || [])}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: 'easeOut'
            }}
          >
            <Card className="border-0 bg-white px-8 py-10 shadow-xl">
              <CardHeader className="px-0">
                <CustomImage
                  src={d.icon}
                  width={70}
                  height={70}
                  alt={getLocalizedString(d.title || []) ?? ''}
                  quality={100}
                  className="h-[60px] w-[60px]"
                />
                <h3 className="pt-5 text-2xl font-semibold sm:text-2xl">
                  {getLocalizedString(d.title || [])}
                </h3>
              </CardHeader>
              <CardContent className="text-muted-foreground px-0 text-base">
                {getLocalizedString(d.description || [])}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </ContainerLayout>
  );
}
