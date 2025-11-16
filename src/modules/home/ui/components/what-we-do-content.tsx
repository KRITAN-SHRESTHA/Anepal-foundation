import CustomImage from '@/components/custom-image';
import useGetLocale from '@/hooks/use-get-locale';
import {
  internalGroqTypeReferenceTo,
  InternationalizedArrayStringValue,
  InternationalizedArrayTextValue,
  SanityImageCrop,
  SanityImageHotspot
} from '@/sanity/types';
import { trpc } from '@/trpc/client';
import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type ContentType = {
  title?: Array<
    {
      _key: string;
    } & InternationalizedArrayStringValue
  >;
  heading?: Array<
    {
      _key: string;
    } & InternationalizedArrayStringValue
  >;
  description?: Array<
    {
      _key: string;
    } & InternationalizedArrayTextValue
  >;
  image?: {
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: 'image';
  };
  _key: string;
};

export default function WhatWeDoContent() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong....</div>}>
      <Suspense fallback={'loading...'}>
        <WhatWeDoContentSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function WhatWeDoContentSuspense() {
  const [data] = trpc.home.getOrgHelpsInFields.useSuspenseQuery();
  const [activeCategory, setActiveCategory] = useState<ContentType>();
  console.log('🚀 ~ WhatWeDoContentSuspense ~ activeCategory:', activeCategory);
  const { getLocalizedString } = useGetLocale();

  useEffect(() => {
    if (data.content) {
      setActiveCategory(data.content[0]);
    }
  }, [data.content]);

  return (
    <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
      {/* Left - Categories List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="space-y-3 md:space-y-6 lg:col-span-4"
      >
        {data.content?.map((content, index) => (
          <motion.button
            key={content._key}
            onClick={() => setActiveCategory(content)}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            className="group flex w-full cursor-pointer gap-3 text-left transition-all duration-300 lg:gap-4"
          >
            {/* Number */}
            <span
              className={`mt-1 text-sm font-bold transition-all duration-300 ${
                activeCategory?._key === content._key
                  ? 'text-gray-900'
                  : 'text-gray-300'
              }`}
            >
              0{index + 1}.
            </span>

            {/* Title */}
            <div className="relative flex-1">
              <h3
                className={`text-3xl font-semibold tracking-tight transition-all duration-300 lg:text-4xl ${
                  activeCategory?._key === content._key
                    ? 'text-gray-900'
                    : 'text-gray-300'
                }`}
              >
                {getLocalizedString(content.title ?? [])}
              </h3>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Middle - Dynamic Content Card */}
      <div className="relative z-1 flex md:h-[380px] lg:col-start-6 lg:col-end-10">
        <div className="relative h-full w-full rounded-xl bg-white p-6 shadow-xl md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory?._key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="relative grid h-full content-between gap-4"
            >
              <div className="space-y-7">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1
                  }}
                  className="inline-flex"
                >
                  <CustomImage
                    src={activeCategory?.image}
                    className="object-contain"
                    alt=""
                    width={80}
                    height={80}
                  />
                </motion.div>

                {/* Heading */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-2xl leading-tight font-semibold text-gray-900 uppercase"
                >
                  {getLocalizedString(activeCategory?.heading ?? [])}
                </motion.h3>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="bottom-0 text-sm leading-relaxed text-gray-700 lg:text-base"
              >
                {getLocalizedString(activeCategory?.description ?? [])}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
