import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

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

export default function BlogView() {
  return (
    <div>
      <section className="py-32">
        <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6">
              Latest Updates
            </Badge>
            <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
              Blog Posts
            </h2>
            <p className="text-muted-foreground mb-8 md:text-base lg:max-w-2xl lg:text-lg">
              Discover the latest trends, tips, and best practices in modern web
              development. From UI components to design systems, stay updated
              with our expert insights.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map(post => (
              <Card
                key={post.id}
                className="grid grid-rows-[auto_auto_1fr_auto] pt-0"
              >
                <div className="aspect-16/9 w-full">
                  <a
                    href={post.url}
                    target="_blank"
                    className="fade-in transition-opacity duration-200 hover:opacity-70"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </a>
                </div>
                <CardHeader>
                  <h3 className="text-lg font-semibold hover:underline md:text-xl">
                    <a href={post.url} target="_blank">
                      {post.title}
                    </a>
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.summary}</p>
                </CardContent>
                <CardFooter>
                  <a
                    href={post.url}
                    target="_blank"
                    className="text-foreground flex items-center hover:underline"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
