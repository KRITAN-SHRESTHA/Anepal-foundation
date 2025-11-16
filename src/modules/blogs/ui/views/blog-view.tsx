import React from 'react';
import OurBlogsListSection from '../sections/our-blogs-list-section';
import BlogListPageTitleSection from '../components/blog-list-page-title-section';
import BlogsPagination from '../components/blogs-pagination';

export default function BlogView() {
  return (
    <main>
      <BlogListPageTitleSection />
      <section className="py-20 md:py-32">
        <div className="container mx-auto flex flex-col items-center gap-16 px-4 sm:px-6 lg:px-16">
          <OurBlogsListSection />
          <BlogsPagination />
        </div>
      </section>
    </main>
  );
}
