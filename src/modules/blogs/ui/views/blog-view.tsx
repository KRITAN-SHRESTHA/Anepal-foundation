import React from 'react';
import OurBlogsListSection from '../sections/our-blogs-list-section';
import BlogListPageTitleSection from '../components/blog-list-page-title-section';
import BlogsPagination from '../components/blogs-pagination';
import ContainerLayout from '@/components/container-layout';

export default function BlogView() {
  return (
    <main>
      <BlogListPageTitleSection />
      <section className="py-20 md:py-32">
        <ContainerLayout>
          <OurBlogsListSection />
          <BlogsPagination />
        </ContainerLayout>
      </section>
    </main>
  );
}
