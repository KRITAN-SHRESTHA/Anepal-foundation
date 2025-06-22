'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface CustomImageProps
  extends Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> {
  src?: SanityImageSource;
  alt: string;
}

export default function CustomImage({
  src,
  alt,
  className,
  ...props
}: CustomImageProps) {
  return (
    <>
      {src && (
        <Image
          src={urlFor(src).quality(100).url()}
          alt={alt}
          className={cn('h-full w-full mix-blend-multiply', className)}
          quality={100}
          {...props}
        />
      )}
    </>
  );
}
