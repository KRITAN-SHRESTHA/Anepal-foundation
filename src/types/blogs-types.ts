import { Blog_tag, Blogs } from '@/sanity/types';

export type PopulatedBlogsList = Omit<Blogs, 'tag'> & {
  tag: Blog_tag;
};
