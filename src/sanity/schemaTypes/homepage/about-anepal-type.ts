import { defineField, defineType } from 'sanity';

import { validationLang } from '../../lib/validation-lang';
import { InfoOutlineIcon } from '@sanity/icons';

export const aboutAnepalType = defineType({
  title: 'About Anepal',
  name: 'about-anepal',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add title in all languages');
        })
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add subtitle in all languages');
        })
    }),
    defineField({
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
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Recommended size: 580x430px',
      options: {
        hotspot: true
      },
      validation: rule => rule.required().error('Image is required')
    })
    // defineField({
    //   name: 'link',
    //   title: 'Link',
    //   type: 'url',
    //   description:
    //     'After clicking on "read more" will be redirected to the link you provided - /about-us',
    //   initialValue: '/about-us',
    //   validation: rule =>
    //     rule
    //       .uri({ allowRelative: true })
    //       .error(
    //         'Please enter a valid URL (e.g., "/about" or "https://example.com")'
    //       )
    // })
  ],
  preview: {
    prepare() {
      return {
        title: 'About Anepal'
      };
    }
  }
});
