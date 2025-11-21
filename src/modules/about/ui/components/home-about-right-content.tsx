import CustomImage from '@/components/custom-image';
import { Award, Heart } from 'lucide-react';
import React from 'react';
import { motion } from 'motion/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { trpc } from '@/trpc/client';
import { useTranslations } from 'next-intl';

interface Props {
  imageUrl?: SanityImageSource;
  title?: string | null;
}

export default function HomeAboutRightContent({ imageUrl, title }: Props) {
  const { data } = trpc.aboutus.getHomeAboutUs.useQuery();
  const t = useTranslations('Default');

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Main Image Container */}
      <div className="relative">
        {/* Animated Background Gradient Shapes */}
        <motion.div
          animate={{
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="from-accent-foreground/20 absolute -top-6 -right-6 size-72 rounded-full bg-gradient-to-br via-purple-500/20 to-pink-500/20 blur-3xl lg:-top-12 lg:-right-12 lg:size-96"
        />

        <motion.div
          animate={{
            rotate: [0, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
          className="absolute -left-6 size-64 rounded-full bg-gradient-to-tr from-blue-500/20 via-cyan-500/20 to-teal-500/20 blur-3xl lg:-left-12 lg:size-80"
        />

        {/* Decorative Corner Accents */}
        <div className="border-accent-foreground/30 absolute -top-4 -left-4 z-30 h-20 w-20 border-t-4 border-l-4 lg:h-32 lg:w-32" />
        <div className="border-accent-foreground/30 absolute -right-4 -bottom-4 z-30 h-20 w-20 border-r-4 border-b-4 lg:h-32 lg:w-32" />

        {/* Main Image with Border Frame */}
        <div className="relative z-20 p-4 lg:p-6">
          {/* Image Container */}
          <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl lg:rounded-[2.5rem]">
            <div className="relative aspect-[4/5] w-full">
              {imageUrl ? (
                <CustomImage
                  src={imageUrl}
                  alt={title ?? 'About us'}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="from-accent-foreground/10 flex h-full w-full items-center justify-center bg-gradient-to-br to-blue-500/10">
                  <Award className="text-accent-foreground/30 size-24" />
                </div>
              )}

              {/* Image Overlay Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
            </div>
          </div>
        </div>

        {/* Floating Achievement Badge - Top Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="absolute top-12 -right-4 z-30 lg:top-20 lg:-right-8"
        >
          <div className="relative">
            {/* Glow Effect */}
            <div className="bg-accent-foreground/30 absolute inset-0 rounded-full blur-xl" />
            {/* Badge */}
            <div className="from-accent-foreground to-accent-foreground/80 relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br shadow-2xl lg:size-20">
              <div className="text-center">
                <div className="text-xl font-bold text-white lg:text-2xl">
                  {data?.years_of_service}+
                </div>
                <div className="text-[8px] font-semibold text-white/90 uppercase lg:text-[10px]">
                  {t('Years')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Stats Card - Bottom Left */}
        <motion.div
          initial={{ opacity: 0, y: 20, x: -20 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute -bottom-6 -left-6 z-30 lg:-bottom-8 lg:-left-8"
        >
          <div className="group hover:shadow-accent-foreground/20 relative overflow-hidden rounded-2xl bg-white p-5 shadow-xl backdrop-blur-sm transition-all duration-300 lg:rounded-3xl lg:p-7">
            {/* Gradient Overlay on Hover */}
            <div className="from-accent-foreground/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-center gap-4">
              {/* Icon */}
              <div className="from-accent-foreground/10 to-accent-foreground/5 group-hover:from-accent-foreground group-hover:to-accent-foreground/80 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br transition-all duration-300 lg:size-16">
                <Heart className="text-accent-foreground size-6 transition-colors duration-300 group-hover:text-white lg:size-8" />
              </div>

              {/* Text */}
              <div>
                <div className="text-2xl font-bold text-gray-900 lg:text-3xl">
                  {data?.lives_impact}+
                </div>
                <div className="text-xs text-gray-600 lg:text-sm">
                  {t('Lives_Impacted')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Geometric Shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 right-0 z-10 hidden size-20 opacity-20 lg:block"
        >
          <div className="border-accent-foreground h-full w-full border-4" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 left-0 z-10 hidden size-16 opacity-20 lg:block"
        >
          <div className="h-full w-full rounded-full border-4 border-purple-500" />
        </motion.div>

        {/* Decorative Dots Pattern - Enhanced */}
        <div className="absolute -right-8 -bottom-8 hidden lg:block">
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 1.2 + i * 0.02,
                  duration: 0.3
                }}
                className="from-accent-foreground/40 size-2 rounded-full bg-gradient-to-br to-purple-500/40"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
