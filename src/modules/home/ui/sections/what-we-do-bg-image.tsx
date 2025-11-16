'use client';

import CustomImage from '@/components/custom-image';
import { trpc } from '@/trpc/client';
import { motion } from 'motion/react';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function WhatWeDoBgImage() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong....</div>}>
      <Suspense fallback={'loading...'}>
        <WhatWeDoBgImageSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function WhatWeDoBgImageSuspense() {
  const [data] = trpc.home.getOrgHelpsInFields.useSuspenseQuery();
  console.log('data', data);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="absolute right-0 -bottom-10 z-0 hidden lg:block"
    >
      <div className="relative h-[450px] w-[500px]">
        {/* Background Image  */}
        <CustomImage
          src={data.background_img}
          fill
          alt="Children smiling"
          className="object-cover object-center"
        />
      </div>
    </motion.div>
  );
}
