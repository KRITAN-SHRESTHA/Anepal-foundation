import { ArrowRight, Award, Heart } from 'lucide-react';
import React from 'react';
import { motion } from 'motion/react';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface Props {
  badgeText?: string | null;
  title?: string | null;
  description?: string | null;
}

export default function HomeAboutLeftContent({
  badgeText,
  title,
  description
}: Props) {
  const t = useTranslations('Default');
  return (
    <div className="relative flex flex-col justify-center">
      {/* Decorative Background Element */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="from-accent-foreground/10 absolute top-0 -left-20 size-40 rounded-full bg-gradient-to-br to-purple-500/10 blur-3xl lg:-left-32 lg:size-64"
      />
      {/* Section Badge  */}
      {badgeText && <EnhancedBadge text={badgeText} variant="green" />}
      {/* Title */}
      {title && <EnhancedTitle text={title} />}
      {/* Description  */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative mb-8"
      >
        {/* Quote Mark */}
        <div className="text-accent-foreground/10 absolute -top-7 -left-6 text-6xl font-bold lg:-left-10 lg:text-8xl">
          &ldquo;
        </div>

        <p className="relative text-base leading-relaxed text-gray-700 lg:text-lg lg:leading-relaxed">
          {description?.slice(0, 350)}
          {description && description.length > 350 && (
            <span className="font-semibold">
              ... &nbsp;
              <Dialog>
                <DialogTrigger>
                  <span className="cursor-pointer font-medium underline-offset-1 hover:underline">
                    {t('see more')}
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
        </p>
      </motion.div>
      {/* CTA Button  */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative"
      >
        <Link href="/about-us">
          <Button
            size="lg"
            className="group from-accent-foreground to-accent-foreground/90 hover:shadow-accent-foreground/30 relative h-14 overflow-hidden bg-gradient-to-r text-base font-bold shadow-xl transition-all duration-300 hover:shadow-2xl md:px-8 lg:text-lg"
          >
            <span className="relative flex items-center gap-3 uppercase">
              {t('Learn_More_About_Us')}
              <motion.div
                animate={{
                  x: [0, 5, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <ArrowRight className="size-5 lg:size-6" />
              </motion.div>
            </span>
          </Button>
        </Link>
      </motion.div>

      {/* Quick Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12 flex flex-wrap items-center gap-8"
      >
        {/* Stat 1 */}
        <div className="group flex items-center gap-3">
          <div className="from-accent-foreground/10 to-accent-foreground/5 group-hover:from-accent-foreground group-hover:to-accent-foreground/80 flex size-12 items-center justify-center rounded-full bg-gradient-to-br transition-all duration-300">
            <Heart className="text-accent-foreground size-6 transition-colors duration-300 group-hover:text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-xs text-gray-600">{t('Committed')}</div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-12 w-px bg-gray-200" />

        {/* Stat 2 */}
        <div className="group flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-purple-500/5 transition-all duration-300 group-hover:from-purple-500 group-hover:to-purple-600">
            <Award className="size-6 text-purple-600 transition-colors duration-300 group-hover:text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {t('Trusted')}
            </div>
            <div className="text-xs text-gray-600">{t('Organization')}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
