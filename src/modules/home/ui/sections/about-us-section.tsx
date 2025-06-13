'use client';

import { urlFor } from '@/sanity/lib/image';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';

export default function AboutUsSection() {
  const [data] = trpc.home.getAboutUs.useSuspenseQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <div className="tablet:grid-cols-2 mx-auto mt-5 grid w-full max-w-screen-xl items-center gap-x-12 gap-y-8 px-4 py-8 sm:px-6 md:mt-14 md:py-12 lg:px-8">
      <div>
        <h1 className="tablet:max-w-[17ch] mt-6 text-4xl !leading-[1.2] font-bold md:text-5xl lg:text-[2.75rem] xl:text-5xl">
          {getLocalizedString(data?.title ?? [])}
        </h1>
        <h2 className="text-2xl font-medium">
          {getLocalizedString(data?.subtitle ?? [])}
        </h2>

        <p className="tablet:max-w-[60ch] mt-6 text-lg">
          {getLocalizedString(data?.description ?? [])}
        </p>
        <div className="tablet:mt-12 mt-6 flex items-center gap-4">
          <Link href={'/about-us'}>
            <Button
              variant="outline"
              className="rounded-full !px-5 text-base shadow-none [&_svg]:!size-4"
              border={'purple'}
            >
              <BookOpen className="!h-5 !w-5" /> Read Story
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-accent relative aspect-[16/12] w-full overflow-hidden rounded-xl">
        {data.image && (
          <Image
            className="h-full w-full object-cover"
            src={urlFor(data.image).quality(100).url()}
            alt={getLocalizedString(data?.title ?? []) ?? 'hero-section-img'}
            fill
            sizes="30vw"
          />
        )}
      </div>
    </div>
  );
}
