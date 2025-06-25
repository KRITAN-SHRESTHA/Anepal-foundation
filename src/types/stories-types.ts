import { StoriesList, StoriesPageContent } from '@/sanity/types';

export type PopulatedStoriesPageContent = Omit<
  StoriesPageContent,
  'stories'
> & {
  stories: StoriesList[];
};
