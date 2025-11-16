'use client';

import PaginationComponent from '@/components/pagination-component';
import useGetAllBlogs from '../hooks/use-get-all-blogs';

export default function BlogsPagination() {
  const {
    pagination: { page: currentPage, total, totalPages },
    blogs
  } = useGetAllBlogs();

  if (totalPages === 1) return null;
  if (blogs.length === 0) return null;

  return (
    <div className="mt-20">
      <PaginationComponent
        currentPage={currentPage}
        total={total}
        totalPages={totalPages}
      />
    </div>
  );
}
