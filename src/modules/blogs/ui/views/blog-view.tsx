import React from 'react';
import OurBlogsListSection from '../sections/our-blogs-list-section';
import BlogListPageTitleSection from '../components/blog-list-page-title-section';
import BlogsPagination from '../components/blogs-pagination';

export default function BlogView() {
  return (
    <section className="py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <BlogListPageTitleSection />
        <OurBlogsListSection />
        <BlogsPagination />
      </div>
    </section>
  );
}
