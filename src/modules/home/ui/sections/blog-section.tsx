import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import ContentTitle from '@/components/content-title';

export default function BlogSection() {
  return (
    <section className="bg-accent py-14">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <ContentTitle subtitle={'News & Updates'} />

          <Button
            variant="outline"
            border={'purple'}
            className="mt-7 w-[180px] rounded-full"
            asChild
          >
            <Link href={'/'} target="_blank">
              View all news
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map(post => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] pt-0"
            >
              <div className="relative aspect-16/9 w-full">
                <Link
                  href={post.url}
                  target="_blank"
                  className="fade-in transition-opacity duration-200 hover:opacity-70"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover object-center"
                    fill
                  />
                </Link>
              </div>
              <CardHeader className="gap-2.5">
                <Badge variant={'secondary'}>Water</Badge>

                <h3 className="text-primary text-lg font-semibold hover:underline md:text-xl">
                  <a href={post.url} target="_blank">
                    {post.title}
                  </a>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
              <CardFooter className="justify-between">
                <p className="text-muted-foreground text-sm">Jan 30, 2020</p>
                <Link
                  href={post.url}
                  target="_blank"
                  className="text-foreground flex items-center hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
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
