'use client';

import ContainerLayout from '@/components/container-layout';
import CustomImage from '@/components/custom-image';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import NavigationLink from '@/components/navigation-link';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import useGetLocale from '@/hooks/use-get-locale';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'motion/react';

export default function BlogSection() {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <Suspense fallback="Loading...">
        <BlogSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function BlogSectionSuspense() {
  const [data] = trpc.home.getHomeBlogsList.useSuspenseQuery();

  const { getLocalizedString } = useGetLocale();

  if (data.length === 0) return null;

  return (
    <section className="bg-white py-14">
      <ContainerLayout className="space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <EnhancedBadge text={'from our blog'} variant="green" />
          <EnhancedTitle text={'Recent news & updates'} className="mb-0" />
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {data.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group grid grid-rows-[auto_auto_1fr_auto] border-none bg-transparent pt-0 pb-0 shadow-none">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <NavigationLink
                    href={`/blogs/${blog.slug?.current}`}
                    className="fade-in duration-200"
                  >
                    <CustomImage
                      src={blog.mainImage}
                      alt={getLocalizedString(blog.title ?? [])!}
                      className="h-full w-full rounded-xl object-cover transition-all duration-300 group-hover:scale-105"
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
                    <p className="text-muted-foreground text-sm">
                      Jan 30, 2020
                    </p>
                  </div>

                  <h3 className="line-clamp-1 text-2xl font-semibold text-gray-900 hover:underline">
                    <NavigationLink href={`/blogs/${blog.slug?.current}`}>
                      {getLocalizedString(blog.title ?? [])!}
                    </NavigationLink>
                  </h3>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </ContainerLayout>
    </section>
  );
}
