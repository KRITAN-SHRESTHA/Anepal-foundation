import { getLocalizedString } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { HomeBanner } from '@/sanity/types';
import Image from 'next/image';
import React from 'react';

export default function BannerImg({
  image,
  title
}: Pick<HomeBanner, 'image' | 'title'>) {
  return (
    <>
      {image && (
        <Image
          src={urlFor(image)
            .auto('format')
            .width(Math.min(2048, window.innerWidth))
            .quality(100)
            .url()}
          alt={getLocalizedString(title ?? []) ?? 'banner-img'}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={100}
        />
      )}
    </>
  );
}
