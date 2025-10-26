import { defineType } from 'sanity';
import { Calendar } from 'lucide-react';

import { InternalizedArrayStringValueType } from '@/types';

import { validationLang } from '../../lib/validation-lang';

export const blogsSchema = defineType({
  name: 'blogs',
  title: 'Blogs',
  type: 'document',
  icon: Calendar,
  fields: [
    {
      name: 'title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add title in all languages');
        })
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (val: InternalizedArrayStringValueType) => {
          if (
            Array.isArray(val) &&
            val[0] &&
            typeof val[0].value === 'string'
          ) {
            const convertToSlug = val[0].value
              .split(' ')
              .map((val: string) => val.toLowerCase())
              .join('-');
            return convertToSlug;
          }
          return typeof val === 'string' ? val : '';
        }
      }
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'reference',
      to: [{ type: 'blog_tag' }],
      validation: rule => rule.required().error('Tag is required')
    },
    {
      name: 'short_description',
      type: 'internationalizedArrayText',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add short description in all languages'
          );
        })
    },

    {
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true
      }
      // fields: [
      //   {
      //     name: 'alt',
      //     type: 'string',
      //     title: 'Alternative Text (describe about image in a sentence)',
      //     validation: rule => rule.required().error('Image alt is required')
      //   }
      // ]
    },
    {
      name: 'content',
      type: 'object',
      fields: [
        {
          name: 'content_en',
          title: 'Content (en)',
          type: 'blockContent',
          validation: rule => rule.required().error('Content en is required')
        },
        {
          name: 'content_es',
          title: 'Content (es)',
          type: 'blockContent',
          validation: rule => rule.required().error('Content es is required')
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(args) {
      return {
        title: args.title?.[0]?.value || ''
      };
    }
  }
});
