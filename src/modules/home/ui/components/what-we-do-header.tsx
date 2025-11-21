'use client';

import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import { trpc } from '@/trpc/client';
import useGetLocale from '@/hooks/use-get-locale';
import { useTranslations } from 'next-intl';

export default function WhatWeDoHeader() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong....</div>}>
      <Suspense fallback={'loading...'}>
        <WhatWeDoHeaderSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function WhatWeDoHeaderSuspense() {
  const [data] = trpc.home.getWhatWeDoToHelp.useSuspenseQuery();
  console.log('🚀 ~ WhatWeDoHeaderSuspense ~ data:', data);
  const { getLocalizedString } = useGetLocale();
  const t = useTranslations('Default');

  return (
    <div className="mb-12 lg:mb-16">
      {data?.badge_text && (
        <EnhancedBadge
          text={getLocalizedString(data.badge_text ?? [])}
          variant="blue"
        />
      )}

      <div className="grid grid-cols-1 gap-8 align-top md:grid-cols-2">
        {/* Left - Badge and Title */}
        {/* Main Heading */}
        {data?.title && (
          <EnhancedTitle
            text={getLocalizedString(data.title ?? [])}
            // text="Give a Future Full of Choices"
            className="text-balance"
          />
        )}

        {/* Right - Description and Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-md space-y-6"
        >
          <p className="text-sm leading-relaxed text-gray-700 lg:text-base">
            {getLocalizedString(data?.description ?? [])}
          </p>

          <Link href={'/our-team'}>
            <Button
              size="lg"
              className="group from-accent-foreground to-accent-foreground/90 hover:shadow-accent-foreground/30 relative h-14 overflow-hidden bg-gradient-to-r text-base font-bold transition-all duration-300 md:px-8 lg:text-lg"
            >
              <span className="relative flex items-center gap-2">
                {t('JOIN_OUR_TEAM')}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <ArrowRight className="size-4 lg:size-5" />
                </motion.div>
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
