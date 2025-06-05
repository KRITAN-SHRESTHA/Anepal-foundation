import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { validationLang } from '../lib/validation-lang';

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'Identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Internal name to identify this header item in the Studio',
      validation: rule =>
        rule
          .required()
          .error('Please provide an identifier for this navigation item')
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'internationalizedArrayString',
      description: 'The text that will be displayed in the navigation menu',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add name in all languages');
        })
    }),

    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Leave empty if this item has sub links',
      validation: rule =>
        rule
          .uri({ allowRelative: true })
          .error(
            'Please enter a valid URL (e.g., "/about" or "https://example.com")'
          )
    }),
    defineField({
      name: 'subLinks',
      title: 'Sub Links',
      type: 'array',
      description: 'Add dropdown menu items',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'Identifier',
              title: 'Identifier',
              type: 'string',
              description:
                'Internal name to identify this header item in the Studio',
              validation: rule =>
                rule
                  .required()
                  .error('Please provide an identifier for this sub-menu item')
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'internationalizedArrayString',
              description: 'This will be displayed in the dropdown menu',
              validation: rule =>
                rule.custom<{ value: string; _type: string; _key: string }[]>(
                  value => {
                    return validationLang(
                      value,
                      'Please add name in all languages for this sub-menu item'
                    );
                  }
                )
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'URL for this sub-menu item',
              validation: rule =>
                rule
                  .required()
                  .uri({ allowRelative: true })
                  .error('Please enter a valid URL for this sub-menu item')
            })
          ]
        }
      ]
    })
  ]
});
