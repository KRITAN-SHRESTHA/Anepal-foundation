import ContainerLayout from '@/components/container-layout';
import CustomImage from '@/components/custom-image';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import Image from 'next/image';
import React from 'react';

export default function WhoWeAreSection() {
  const { data } = trpc.aboutus.getAboutUs.useQuery();

  const { getLocalizedString } = useGetLocale();

  const description = getLocalizedString(data?.whoWeAre?.description ?? []);
  const title = getLocalizedString(data?.whoWeAre?.title ?? []);

  return (
    <ContainerLayout className="bg-white/10 py-15 md:py-25">
      <div className="grid items-center gap-10 md:grid-cols-12">
        {/* image section */}
        <div className="relative hidden h-[600px] items-center justify-center md:col-span-7 md:flex">
          {/* backgound image */}
          <div className="absolute top-1/2 left-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2">
            <Image
              src={'/assets/background/about-img-bg-content.png'}
              fill
              alt=""
              className="object-contain"
            />
          </div>
          {/* actual image */}
          <div className="absolute top-14">
            <div className="relative -left-10 h-[400px] w-[350px] -rotate-12 rounded-md border-[10px] border-white shadow-xl">
              {data?.whoWeAre?.images && (
                <CustomImage
                  src={data?.whoWeAre?.images[0]}
                  className="object-cover"
                  alt=""
                  fill
                />
              )}
            </div>
            <div className="relative -top-50 -right-10 h-[400px] w-[350px] rotate-12 rounded-md border-[10px] border-white shadow-xl lg:-right-25">
              {data?.whoWeAre?.images && (
                <CustomImage
                  src={data?.whoWeAre?.images[1]}
                  className="object-cover"
                  alt=""
                  fill
                />
              )}
            </div>
          </div>
        </div>
        {/* content section */}
        <div className="md:col-span-5">
          <EnhancedBadge
            text={data?.whoWeAre?.badge_text}
            variant="pink"
            className="mb-3"
          />
          <EnhancedTitle text={title} />

          <p className="relative text-xl leading-relaxed">
            {description?.slice(0, 350)}
            {description && description.length > 350 && (
              <span className="font-semibold">
                ... &nbsp;
                <Dialog>
                  <DialogTrigger>
                    <span className="cursor-pointer font-medium underline-offset-1 hover:underline">
                      see more
                    </span>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] w-full max-w-[800px]! overflow-y-auto px-[25px] py-[50px] sm:p-[50px]">
                    <DialogTitle className="text-3xl text-gray-800">
                      <b>{title}</b>
                    </DialogTitle>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {description}
                    </p>
                  </DialogContent>
                </Dialog>
              </span>
            )}
          </p>
          <br />
        </div>
      </div>
    </ContainerLayout>
  );
}
