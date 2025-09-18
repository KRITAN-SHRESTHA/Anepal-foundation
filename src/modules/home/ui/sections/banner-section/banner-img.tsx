import { getLocalizedString } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { HomeBanner } from '@/sanity/types';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function BannerImg({
  image,
  title,
  priority = false
}: Pick<HomeBanner, 'image' | 'title'> & { priority?: boolean }) {
  const locale = useLocale();
  return (
    <>
      {image && (
        <Image
          src={urlFor(image).auto('format').width(1920).url()}
          alt={getLocalizedString(title ?? [], locale) ?? 'banner-img'}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      )}
    </>
  );
}
