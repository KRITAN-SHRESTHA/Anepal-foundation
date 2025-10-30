import { defineType } from 'sanity';
import { Calendar } from 'lucide-react';

import { validationLang } from '../../lib/validation-lang';

export const blogListPageSchema = defineType({
  name: 'blogListPage',
  title: 'Blog List Page',
  type: 'document',
  icon: Calendar,
  fields: [
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
          validation: rule =>
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add title in all languages'
                );
              }
            )
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          validation: rule => rule.required().error('Image is required')
        }
      ]
    },
    {
      name: 'title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add title in all languages');
        })
    },
    {
      name: 'subtitle',
      type: 'internationalizedArrayText',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add subtitle in all languages');
        })
    }
    // {
    //   name: 'highlightTitle',
    //   title: 'Highlight Title',
    //   type: 'internationalizedArrayString',
    //   validation: rule =>
    //     rule
    //       .required()
    //       .custom<{ value: string; _type: string; _key: string }[]>(value => {
    //         return validationLang(
    //           value,
    //           'Please add highlight title in all languages'
    //         );
    //       })
    // },
    // {
    //   name: 'short_description',
    //   type: 'internationalizedArrayText',
    //   validation: rule =>
    //     rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
    //       return validationLang(value, 'Please add subtitle in all languages');
    //     })
    // }
  ],
  preview: {
    select: {
      title: 'title',
      highlightTitle: 'highlightTitle'
    },
    prepare(args) {
      return {
        title: args.title?.[0]?.value || ''
      };
    }
  }
});
