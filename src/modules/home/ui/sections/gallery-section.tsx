'use client';

import { trpc } from '@/trpc/client';
import CustomImage from '@/components/custom-image';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { motion } from 'motion/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';

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

  if (!data) return null;

  return (
    <section className="relative overflow-hidden bg-transparent py-20 lg:py-25">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          {/* Badge */}
          <EnhancedBadge text={data.subtitle} variant="blue" />
          <EnhancedTitle text={data.title} />
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
