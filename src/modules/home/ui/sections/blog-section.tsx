'use client';

import Image from 'next/image';

import ContainerLayout from '@/components/container-layout';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import NavigationLink from '@/components/navigation-link';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';

export default function BlogSection() {
  // const t = useTranslations('Default');

  return (
    <section className="bg-white py-14">
      <ContainerLayout className="space-y-10">
        <div className="text-center">
          <EnhancedBadge text={'from our blog'} variant="green" />
          <EnhancedTitle text={'Recent news & updates'} className="mb-0" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map(post => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] border-none bg-transparent pt-0 pb-0 shadow-none"
            >
              <div className="relative aspect-video w-full">
                <NavigationLink
                  href={post.url}
                  className="fade-in transition-opacity duration-200 hover:opacity-70"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full rounded-xl object-cover object-center"
                    fill
                  />
                </NavigationLink>
              </div>
              <CardHeader className="gap-2.5 bg-transparent px-0">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={'secondary'}
                    className="bg-[#f0dd8f] text-sm text-black"
                  >
                    Water
                  </Badge>
                  <p className="text-muted-foreground text-sm">Jan 30, 2020</p>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 hover:underline">
                  <a href={post.url} target="_blank">
                    {post.title}
                  </a>
                </h3>
              </CardHeader>
            </Card>
          ))}
        </div>
        {/* <Button
          variant="outline"
          border={'purple'}
          className="mt-7 w-[180px] rounded-full"
          asChild
        >
          <NavigationLink href={'/'}>
            View all news
            <ArrowRight className="ml-2 size-4" />
          </NavigationLink>
        </Button> */}
      </ContainerLayout>
    </section>
  );
}

const posts = [
  {
    id: 'post-1',
    title: 'Getting Started with shadcn/ui Components',
    summary:
      "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
    label: 'Tutorial',
    author: 'Sarah Chen',
    published: '1 Jan 2024',
    url: 'https://shadcnblocks.com',
    image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg'
  },
  {
    id: 'post-2',
    title: 'Building Accessible Web Applications',
    summary:
      "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
    label: 'Accessibility',
    author: 'Marcus Rodriguez',
    published: '1 Jan 2024',
    url: 'https://shadcnblocks.com',
    image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg'
  },
  {
    id: 'post-3',
    title: 'Modern Design Systems with Tailwind CSS',
    summary:
      'Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.',
    label: 'Design Systems',
    author: 'Emma Thompson',
    published: '1 Jan 2024',
    url: 'https://shadcnblocks.com',
    image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg'
  }
];
