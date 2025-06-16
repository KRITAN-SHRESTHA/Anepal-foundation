import ContentTitle from '@/components/content-title';
import Image from 'next/image';
import React from 'react';

export default function WhoHelpUsSection() {
  return (
    <div className="py-[60px] sm:py-[100px]">
      <div className="grid justify-center">
        <ContentTitle
          title={'Donors'}
          subtitle={'Who Help Us'}
          align="center"
        />
        <p className="text-muted-foreground max-w-[60ch] pt-6 text-center">
          Tackling the necessity of safe water for all requires a cooperative
          and worldwide effort. Many philanthropists have chosen to take action
          in support of safe water by donating in support of One Drop’s
          projects.
        </p>
      </div>

      <div className="m-auto mt-14 flex max-w-5xl flex-wrap items-center justify-center gap-10">
        <div className="h-10 w-[200px]">
          <Image
            className="h-full w-full object-contain"
            src="https://html.tailus.io/blocks/customers/nvidia.svg"
            alt="Nvidia Logo"
            height={200}
            width={200}
          />
        </div>

        <div className="h-10 w-[200px]">
          <Image
            className="h-full w-full object-contain"
            src="https://html.tailus.io/blocks/customers/column.svg"
            alt="Column Logo"
            height="16"
            width={200}
          />
        </div>
        <div className="h-10 w-[200px]">
          <Image
            className="h-full w-full object-contain"
            src="https://html.tailus.io/blocks/customers/nvidia.svg"
            alt="Nvidia Logo"
            height={200}
            width={200}
          />
        </div>
        <div className="h-10 w-[200px]">
          <Image
            className="h-full w-full object-contain"
            src="https://html.tailus.io/blocks/customers/github.svg"
            alt="Nvidia Logo"
            height={200}
            width={200}
          />
        </div>

        <div className="h-10 w-[200px]">
          <Image
            className="h-full w-full object-contain"
            src="https://html.tailus.io/blocks/customers/nike.svg"
            alt="Nvidia Logo"
            height={200}
            width={200}
          />
        </div>
        <div className="h-10 w-[200px]">
          <Image
            className="h-full w-full object-contain"
            src="https://html.tailus.io/blocks/customers/github.svg"
            alt="Nvidia Logo"
            height={200}
            width={200}
          />
        </div>
      </div>
    </div>
  );
}
