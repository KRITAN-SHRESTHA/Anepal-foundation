import ContainerLayout from '@/components/container-layout';
import CustomImage from '@/components/custom-image';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import React from 'react';

export default function WhyChooseSection() {
  const { data } = trpc.aboutus.getAboutUs.useQuery();

  const { getLocalizedString } = useGetLocale();

  return (
    <ContainerLayout className="py-20 md:py-30">
      <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-2">
        {/* left content */}
        <div>
          <EnhancedBadge
            text={data?.whyChooseSection?.badge_text}
            variant="green"
          />
          <EnhancedTitle
            text={data?.whyChooseSection?.title}
            className="mb-0"
          />
        </div>
        {/* right content */}
        <div>
          <p className="text-muted-foreground text-lg lg:text-2xl">
            We are a national charity working to transform the hopes and
            happiness of young people facing abuse, exploitation and neglect.
          </p>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {data?.whyChooseSection?.items?.map(d => (
          <Card
            key={getLocalizedString(d.title || [])}
            className="border-0 bg-white px-8 py-10 shadow-xl"
          >
            <CardHeader className="px-0">
              <CustomImage
                src={d.icon}
                width={70}
                height={70}
                alt={getLocalizedString(d.title || []) ?? ''}
                quality={100}
                className="h-[60px] w-[60px]"
              />
              <h3 className="pt-5 text-2xl font-semibold sm:text-2xl">
                {getLocalizedString(d.title || [])}
              </h3>
            </CardHeader>
            <CardContent className="text-muted-foreground px-0 text-base">
              {getLocalizedString(d.description || [])}
            </CardContent>
          </Card>
        ))}
      </div>
    </ContainerLayout>
  );
}
