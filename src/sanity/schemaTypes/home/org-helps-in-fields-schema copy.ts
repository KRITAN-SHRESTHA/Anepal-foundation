import { ImageIcon } from '@sanity/icons';
import { defineType } from 'sanity';

import { validationLang } from '../../lib/validation-lang';

export const orgHelpsInFieldsCopySchema = defineType({
  title: 'Organization helps in different fields',
  name: 'org_helps_in_fields_copy',
  type: 'document',
  icon: ImageIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add name in all languages');
        })
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add subtitle in all languages');
        })
    },
    {
      name: 'content',
      title: 'Add content',
      type: 'array',
      of: [
        {
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
                      'Please add name in all languages'
                    );
                  }
                )
            },
            {
              name: 'description',
              title: 'Description',
              type: 'internationalizedArrayText',
              validation: rule =>
                rule.custom<{ value: string; _type: string; _key: string }[]>(
                  value => {
                    return validationLang(
                      value,
                      'Please add description in all languages'
                    );
                  }
                )
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: rule => rule.required().error('Image is required')
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            },
            prepare(args) {
              return {
                title: args.title?.[0]?.value || 'Untitled',
                media: args.media
              };
            }
          }
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
