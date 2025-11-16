'use client';

import { trpc } from '@/trpc/client';
import CustomImage from '@/components/custom-image';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { motion } from 'motion/react';
import useGetLocale from '@/hooks/use-get-locale';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export default function GallerySection() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading...">
        <GallerySectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function GallerySectionSuspense() {
  const [data] = trpc.home.getHomeGallery.useSuspenseQuery();
  const { getLocalizedString } = useGetLocale();

  if (!data) return null;

  const subtitle = getLocalizedString(data?.subtitle ?? []);
  const highlightTitle = getLocalizedString(data?.highlightTitle ?? []);
  const title = getLocalizedString(data?.title ?? []);

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          {/* Badge */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block"
            >
              <span className="border-accent-foreground/20 bg-accent-foreground/5 text-accent-foreground inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {highlightTitle && (
              <span className="text-accent-foreground">{highlightTitle} </span>
            )}
            {title}
          </motion.h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
          {data.images?.map((image, index) => (
            <GalleryItem key={image._key} image={image.image!} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({
  image,
  index
}: {
  image: SanityImageSource;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative aspect-square overflow-hidden rounded-lg"
    >
      <div className="relative h-full w-full">
        <CustomImage
          src={image}
          fill
          alt="Gallery image"
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
        />

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Border effect on hover */}
      <div className="border-accent-foreground absolute inset-0 rounded-lg border-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}
