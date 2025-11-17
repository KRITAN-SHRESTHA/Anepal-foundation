'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'motion/react';
import BlogCard from '@/components/blog-card';
import BlogsListSkeleton from '../components/blogs-list-skeleton';
import useGetAllBlogs from '../hooks/use-get-all-blogs';

export default function OurBlogsListSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<BlogsListSkeleton />}>
        <OurBlogsListSectionSuspense />
      </Suspense>
    </ErrorBoundary>
  );
}

function OurBlogsListSectionSuspense() {
  const { blogs } = useGetAllBlogs();

  if (blogs.length === 0) {
    return <h1>No blogs found</h1>;
  }

  return (
    <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {blogs.map((blog, index) => (
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
  );
}
