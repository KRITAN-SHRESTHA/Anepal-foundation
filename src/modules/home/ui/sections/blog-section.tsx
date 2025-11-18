'use client';

import ContainerLayout from '@/components/container-layout';
import EnhancedBadge from '@/components/enhanced-badge';
import EnhancedTitle from '@/components/enhanced-title';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'motion/react';
import BlogCard from '@/components/blog-card';

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

  if (data.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-30">
      <ContainerLayout className="space-y-20">
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
              <BlogCard {...blog} />
            </motion.div>
          ))}
        </div>
      </ContainerLayout>
    </section>
  );
}
