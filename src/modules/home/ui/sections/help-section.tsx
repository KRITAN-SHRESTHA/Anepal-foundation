'use client';

import ContentTitle from '@/components/content-title';
import CustomImage from '@/components/custom-image';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';

export default function HelpSection() {
  const [data] = trpc.home.getOrgHelpsInFields.useSuspenseQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <div className="bg-accent mt-10 flex items-center justify-center py-12">
      <div>
        <ContentTitle
          subtitle={data.subtitle}
          title={data.title}
          highlightTitleText="Help"
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-screen-xl gap-6 px-4 sm:mt-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {data?.content?.map(feature => (
            <div
              key={feature._key}
              className="flex h-auto flex-col rounded-xl border border-gray-300 px-5 py-6"
            >
              <div className="relative mb-3 flex size-[80px] items-center justify-center rounded-full">
                <CustomImage
                  className="h-full w-full object-contain mix-blend-multiply"
                  src={feature.image}
                  alt="feature"
                  fill
                  sizes="20vw"
                />
              </div>
              <span className="text-lg font-semibold">
                {getLocalizedString(feature.title ?? [])}
              </span>
              <p className="text-muted-foreground mt-1 text-[15px]">
                {getLocalizedString(feature.description ?? [])}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
