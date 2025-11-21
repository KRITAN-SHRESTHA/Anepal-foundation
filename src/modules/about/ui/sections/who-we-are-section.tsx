import ContainerLayout from '@/components/container-layout';
import CustomImage from '@/components/custom-image';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import { motion } from 'motion/react';
import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function WhoWeAreSection() {
  const { data } = trpc.aboutus.getAboutUs.useQuery();

  const { getLocalizedString } = useGetLocale();
  const t = useTranslations('Default');

  const description = getLocalizedString(data?.whoWeAre?.description ?? []);
  const title = getLocalizedString(data?.whoWeAre?.title ?? []);

  return (
    <ContainerLayout className="bg-white/10 py-15 md:py-25">
      <div className="grid items-center gap-10 md:grid-cols-12">
        {/* image section */}
        <motion.div
          className="relative hidden h-[600px] items-center justify-center md:col-span-7 md:flex"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* backgound image */}
          <motion.div
            className="absolute top-1/2 left-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Image
              src={'/assets/background/about-img-bg-content.png'}
              fill
              alt=""
              className="object-contain"
            />
          </motion.div>
          {/* actual image */}
          <div className="absolute top-14">
            <motion.div
              className="relative -left-10 h-[400px] w-[350px] -rotate-12 rounded-md border-[10px] border-white shadow-xl"
              initial={{ opacity: 0, y: 50, rotate: -20 }}
              whileInView={{ opacity: 1, y: 0, rotate: -12 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {data?.whoWeAre?.images && (
                <CustomImage
                  src={data?.whoWeAre?.images[0]}
                  className="object-cover"
                  alt=""
                  fill
                />
              )}
            </motion.div>
            <motion.div
              className="relative -top-50 -right-10 h-[400px] w-[350px] rotate-12 rounded-md border-[10px] border-white shadow-xl lg:-right-25"
              initial={{ opacity: 0, y: -50, rotate: 20 }}
              whileInView={{ opacity: 1, y: 0, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {data?.whoWeAre?.images && (
                <CustomImage
                  src={data?.whoWeAre?.images[1]}
                  className="object-cover"
                  alt=""
                  fill
                />
              )}
            </motion.div>
          </div>
        </motion.div>
        {/* content section */}
        <motion.div
          className="md:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <EnhancedBadge
              text={data?.whoWeAre?.badge_text}
              variant="pink"
              className="mb-3"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <EnhancedTitle text={title} />
          </motion.div>

          <motion.p
            className="relative text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {description?.slice(0, 350)}
            {description && description.length > 350 && (
              <span className="font-semibold">
                ... &nbsp;
                <Dialog>
                  <DialogTrigger>
                    <span className="cursor-pointer font-medium underline-offset-1 hover:underline">
                      {t('See_more')}
                    </span>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] w-full max-w-[800px]! overflow-y-auto px-[25px] py-[50px] sm:p-[50px]">
                    <DialogTitle className="text-3xl text-gray-800">
                      <b>{title}</b>
                    </DialogTitle>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {description}
                    </p>
                  </DialogContent>
                </Dialog>
              </span>
            )}
          </motion.p>
          <br />
        </motion.div>
      </div>
    </ContainerLayout>
  );
}
