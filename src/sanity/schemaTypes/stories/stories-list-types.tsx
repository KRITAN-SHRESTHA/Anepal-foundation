import { List } from 'lucide-react';
import { defineField, defineType } from 'sanity';

import { validationLang } from '@/sanity/lib/validation-lang';

export const storiesListType = defineType({
  name: 'storiesList',
  title: 'Stories list',
  icon: List,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required().error('Name is required')
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name'
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayText',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add description in all languages'
          );
        })
    },
    {
      name: 'image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: rule => rule.required().error('Image is required')
    },
    {
      name: 'content',
      type: 'object',
      fields: [
        defineField({
          name: 'content_en',
          title: 'EN',
          type: 'blockContent',
          validation: rule => rule.required().error('Content EN is required')
        }),
        defineField({
          name: 'content_es',
          title: 'ES',
          type: 'blockContent',
          validation: rule => rule.required().error('Content ES is required')
        })
      ]
    }
  ],

  preview: {
    select: {
      title: 'name'
    },
    prepare(args) {
      return {
        title: args.title || ''
      };
    }
  }
});
