import ContainerLayout from '@/components/container-layout';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import Image from 'next/image';
import React from 'react';

export default function WhoWeAreSection() {
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
              <Image
                src={'/assets/story/kritan_shrestha.jpg'}
                className="object-cover"
                alt=""
                fill
              />
            </div>
            <div className="relative -top-50 -right-10 h-[400px] w-[350px] rotate-12 rounded-md border-[10px] border-white shadow-xl lg:-right-25">
              <Image
                src={'/assets/story/dharmajit_budha.jpg'}
                className="object-cover"
                alt=""
                fill
              />
            </div>
          </div>
        </div>
        {/* content section */}
        <div className="md:col-span-5">
          <EnhancedBadge text={'Who we are'} variant="pink" className="mb-3" />
          <EnhancedTitle text={'We’re worldwide non-profit charity'} />

          <p className="text-xl">
            Since 1994, we have supported more than 1,000 local partners to
            reach more than 15 million children, and we’re working with new
            organizations all the time.
          </p>
          <br />
          <span className="text-muted-foreground">
            We work with babies, children and young people in their families,
            schools and communities to ensure they grow up to be healthy and
            happy.
          </span>
        </div>
      </div>
    </ContainerLayout>
  );
}
