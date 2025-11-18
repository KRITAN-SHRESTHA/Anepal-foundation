import ContainerLayout from '@/components/container-layout';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

const data = [
  {
    id: 0,
    title: 'Sharing',
    description:
      'Share feelings and spiritual to the poor, children around the world, helping them to integrate into the community.',
    icon: '/assets/icons/people-holding-hands.png'
  },
  {
    id: 1,
    title: 'Community',
    description:
      'We help local nonprofits access the funding, tools, training, and support they need to become more.',
    icon: '/assets/icons/community.png'
  },
  {
    id: 2,
    title: 'Responsibilities',
    description:
      'Share feelings and spiritual to the poor, children around the world, helping them to integrate into the community.',
    icon: '/assets/icons/responsibility.png'
  },
  {
    id: 3,
    title: 'Collaboration',
    description:
      'Partnerships across every sector make all of our work for children and young people possible.',
    icon: '/assets/icons/collaboration.png'
  }
];

export default function WhyChooseSection() {
  return (
    <ContainerLayout className="py-20 md:py-30">
      <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-2">
        {/* left content */}
        <div>
          <EnhancedBadge text={'Why choose us'} variant="green" />
          <EnhancedTitle text={'What makes us different'} className="mb-0" />
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
        {data.map(d => (
          <Card key={d.id} className="border-0 bg-white px-8 py-10 shadow-xl">
            <CardHeader className="px-0">
              <Image
                src={d.icon}
                width={70}
                height={70}
                alt={d.title}
                quality={100}
              />
              <h3 className="pt-5 text-2xl font-semibold sm:text-2xl">
                {d.title}
              </h3>
            </CardHeader>
            <CardContent className="text-muted-foreground px-0 text-base">
              {d.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </ContainerLayout>
  );
}
