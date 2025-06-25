import { defineField, defineType } from 'sanity';

import { validationLang } from '../../lib/validation-lang';
import { InfoOutlineIcon } from '@sanity/icons';

export const aboutAnepalType = defineType({
  title: 'About Anepal',
  name: 'about-anepal',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add title in all languages');
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
      name: 'description',
      type: 'internationalizedArrayText',
      validation: rule =>
        rule
          .required()
          .custom<{ value: string; _type: string; _key: string }[]>(value => {
            return validationLang(
              value,
              'Please add description in all languages'
            );
          })
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Recommended size: 580x430px',
      options: {
        hotspot: true
      },
      validation: rule => rule.required().error('Image is required'),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (about image)',
          validation: rule => rule.required().error('Image alt is required')
        })
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'About Anepal'
      };
    }
  }
});
