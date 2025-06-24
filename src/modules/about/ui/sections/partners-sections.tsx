'use client';

import { HTMLAttributes } from 'react';

import ContentTitle from '@/components/content-title';
import CustomImage from '@/components/custom-image';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PartnerSectionProps extends HTMLAttributes<HTMLDivElement> {}

export default function PartnersSection({ className }: PartnerSectionProps) {
  const { data } = trpc.aboutus.getAboutUs.useQuery();

  return (
    <section className={cn('bg-accent px-6 py-12', className)}>
      <div className="mx-auto max-w-5xl">
        <div>
          <ContentTitle
            title={data?.partnersSection.title}
            subtitle={data?.partnersSection.subtitle}
            align="center"
          />

          <div className="mx-auto mt-14 flex max-w-6xl flex-wrap items-center justify-center gap-8">
            {data?.partnersSection.partner.map(partner => (
              <div key={partner._id} className="relative h-[100px] w-[200px]">
                <CustomImage
                  className="object-contain"
                  src={partner.partnersLogo}
                  alt="Nvidia Logo"
                  fill
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
