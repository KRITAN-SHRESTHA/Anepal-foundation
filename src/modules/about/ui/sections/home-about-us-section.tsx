'use client';

import { trpc } from '@/trpc/client';
import ContentSection from '@/components/content-section';

export default function HomeAboutUsSection() {
  const [data] = trpc.aboutus.getHomeAboutUs.useSuspenseQuery();

  return (
    <ContentSection
      image={data.image}
      title={data.title}
      subtitle={data?.subtitle}
      description={data?.description}
      readmoreLink="/about-us"
      imageAlt={data.image?.alt}
    />
  );
}
