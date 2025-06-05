import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const bannerType = defineType({
  name: 'home-banner',
  title: 'Home Banner',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string'
    }),
    defineField({
      name: 'title_es',
      title: 'Title (Spanish)',
      type: 'string'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'description',
      type: 'text'
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string'
    })
  ]
});
