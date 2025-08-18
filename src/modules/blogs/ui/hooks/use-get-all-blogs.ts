'use client';

import { trpc } from '@/trpc/client';
import { useSearchParams } from 'next/navigation';

export default function useGetAllBlogs() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  const [data] = trpc.blogs.getAllBlogs.useSuspenseQuery({
    page: page ? Number(page) : 1
  });

  return {
    ...data
  };
}
