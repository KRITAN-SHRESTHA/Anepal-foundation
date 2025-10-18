'use client';

import PartnersSection from '@/modules/about/ui/sections/partners-sections';
import { trpc } from '@/trpc/client';
import { HTMLAttributes, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PartnerSectionProps extends HTMLAttributes<HTMLDivElement> {}

export default function HomePartnersSection(props: PartnerSectionProps) {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading...">
        <HomePartnersSectionSuspense {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

function HomePartnersSectionSuspense(props: PartnerSectionProps) {
  const [data] = trpc.home.getHomePartners.useSuspenseQuery();
  console.log('data', data);

  return (
    <PartnersSection
      partners={data.partners ?? []}
      title={data?.title}
      subtitle={data?.subtitle}
      highlightTitleText={data?.highlightTitle}
      {...props}
    />
  );
  // return (
  //   <section className={cn('bg-accent px-6 py-12', className)}>
  //     <div className="mx-auto max-w-5xl">
  //       <div>
  //         <ContentTitle
  //           title={'Our Partners & Donors'}
  //           subtitle={'Who help us'}
  //           align="center"
  //         />

  //         <div className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-8">
  //           <Image
  //             className="mx-auto h-6 w-fit"
  //             src="https://html.tailus.io/blocks/customers/nvidia.svg"
  //             alt="Nvidia Logo"
  //             height={200}
  //             width={200}
  //           />
  //           <Image
  //             className="mx-auto h-6 w-fit"
  //             src="https://html.tailus.io/blocks/customers/column.svg"
  //             alt="Column Logo"
  //             height="16"
  //             width={200}
  //           />
  //           <Image
  //             className="mx-auto h-6 w-fit"
  //             src="https://html.tailus.io/blocks/customers/github.svg"
  //             alt="GitHub Logo"
  //             height="16"
  //             width={200}
  //           />
  //           <Image
  //             className="mx-auto h-6 w-fit"
  //             src="https://html.tailus.io/blocks/customers/nike.svg"
  //             alt="Nike Logo"
  //             height="20"
  //             width={200}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
}
