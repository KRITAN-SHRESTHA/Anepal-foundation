import ContentTitle from '@/components/content-title';
import React from 'react';

export default function WhoWeWorkWithSection() {
  return (
    <div className="tablet:flex-row tablet:items-center flex flex-col justify-between gap-9 py-[60px] sm:py-[100px]">
      <div>
        <ContentTitle
          title={'Who we work with'}
          subtitle={'Partners & Donors'}
        />
        <p className="text-muted-foreground tablet:max-w-[60ch] pt-6">
          Tackling the necessity of safe water for all requires a cooperative
          and worldwide effort. Many philanthropists have chosen to take action
          in support of safe water by donating in support of One Drop’s
          projects.
        </p>
      </div>
      <div className="xs:flex-nowrap flex flex-wrap gap-x-[60px] gap-y-[30px]">
        <div>
          <h3 className="text-center text-xl font-extrabold whitespace-nowrap">
            People We Helped
          </h3>
          <span className="xs:text-[80px] text-[70px] font-extrabold lg:text-[100px]">
            500+
          </span>
        </div>
        <div>
          <h3 className="text-center text-xl font-extrabold whitespace-nowrap">
            Dollars We Collected
          </h3>
          <span className="xs:text-[80px] text-[70px] font-extrabold lg:text-[100px]">
            65bil
          </span>
        </div>
      </div>
    </div>
  );
}
