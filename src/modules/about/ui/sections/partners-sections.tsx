'use client';

import { HTMLAttributes } from 'react';

import ContentTitle from '@/components/content-title';
import CustomImage from '@/components/custom-image';
import { cn, LocalisedDataType } from '@/lib/utils';
import { PartnersList } from '@/sanity/types';

interface PartnerSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: LocalisedDataType[] | string | null;
  subtitle?: LocalisedDataType[] | string | null;
  highlightTitleText?: LocalisedDataType[] | string | null;
  partners: PartnersList[];
}

export default function PartnersSection({
  className,
  title,
  subtitle,
  partners,
  highlightTitleText
}: PartnerSectionProps) {
  return (
    <section className={cn('bg-accent px-6 py-12', className)}>
      <div className="mx-auto max-w-5xl">
        <div>
          <ContentTitle
            title={title}
            subtitle={subtitle}
            align="center"
            highlightTitleText={highlightTitleText}
          />

          <div className="mx-auto mt-14 flex max-w-6xl flex-wrap items-center justify-center gap-8">
            {partners?.map(partner => (
              <div key={partner._id} className="relative h-[100px] w-[200px]">
                <CustomImage
                  className="object-contain"
                  src={partner.partnersLogo}
                  alt={partner.partnersName ?? ''}
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
