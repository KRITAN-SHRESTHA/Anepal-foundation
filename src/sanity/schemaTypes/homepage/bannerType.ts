import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { validationLang } from '../../lib/validation-lang';

export const bannerType = defineType({
  title: 'Home Banner',
  name: 'home-banner',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'Identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Internal name to identify this header item in the Studio',
      validation: rule =>
        rule.required().error('Please provide an identifier for this banner')
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule
          .required()
          .custom<{ value: string; _type: string; _key: string }[]>(value => {
            return validationLang(value, 'Please add title in all languages');
          })
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Recommended size: 1920x1080px',
      options: {
        hotspot: true
      },
      validation: rule => rule.required().error('Banner image is required')
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule
          .required()
          .custom<{ value: string; _type: string; _key: string }[]>(value => {
            return validationLang(
              value,
              'Please add description in all languages'
            );
          })
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      // description: 'Add the URL where this banner should redirect to',
      description: "Will accept: '/about', 'https://example.com/about'",
      validation: rule =>
        rule
          .required()
          .uri({ allowRelative: true })
          .error('Please add a valid URL')
    })
  ]
});
