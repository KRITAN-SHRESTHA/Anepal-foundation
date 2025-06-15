import ContentTitle from '@/components/content-title';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PartnerSectionProps extends HTMLAttributes<HTMLDivElement> {}

export default function PartnersSection({ className }: PartnerSectionProps) {
  return (
    <section className={cn('bg-accent px-6 py-12', className)}>
      <div className="mx-auto max-w-5xl">
        <div>
          <ContentTitle
            title={'Who help us'}
            subtitle={'Our Partners & Donors'}
            align="center"
          />

          <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-8">
            {/* <div className="flex"> */}
            <Image
              className="mx-auto h-6 w-fit"
              src="https://html.tailus.io/blocks/customers/nvidia.svg"
              alt="Nvidia Logo"
              height={200}
              width={200}
            />
            {/* </div> */}

            {/* <div className="flex"> */}
            <Image
              className="mx-auto h-6 w-fit"
              src="https://html.tailus.io/blocks/customers/column.svg"
              alt="Column Logo"
              height="16"
              width={200}
            />
            {/* </div> */}
            {/* <div className="flex"> */}
            <Image
              className="mx-auto h-6 w-fit"
              src="https://html.tailus.io/blocks/customers/github.svg"
              alt="GitHub Logo"
              height="16"
              width={200}
            />
            {/* </div> */}
            {/* <div className="flex"> */}
            <Image
              className="mx-auto h-6 w-fit"
              src="https://html.tailus.io/blocks/customers/nike.svg"
              alt="Nike Logo"
              height="20"
              width={200}
            />
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
