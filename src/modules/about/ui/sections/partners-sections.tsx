'use client';

import { HTMLAttributes } from 'react';

import CustomImage from '@/components/custom-image';
import { cn, LocalisedDataType } from '@/lib/utils';
import { PartnersList } from '@/sanity/types';
import EnhancedBadge from '@/components/enhanced-badge';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import ContainerLayout from '@/components/container-layout';

interface PartnerSectionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: LocalisedDataType[] | string | null;
  badge_text?: LocalisedDataType[] | string | null;
  highlightTitleText?: LocalisedDataType[] | string | null;
  partners: PartnersList[];
}

export default function PartnersSection({
  className,
  badge_text,
  partners
}: PartnerSectionProps) {
  return (
    <section className={cn('bg-background/50 px-6 py-12', className)}>
      <ContainerLayout>
        <div className="text-center">
          <EnhancedBadge variant="yellow" text={badge_text} />
          {/* <EnhancedTitle text={title} /> */}
        </div>

        <InfiniteSlider gap={50} reverse>
          {partners?.map(partner => (
            <CustomImage
              key={partner._id}
              className="aspect-video w-[200px] object-contain"
              src={partner.partnersLogo}
              alt={partner.partnersName ?? ''}
              width={200}
              height={200}
            />
          ))}
        </InfiniteSlider>
      </ContainerLayout>
    </section>
  );
}
