import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'name_en',
      title: 'Name (English)',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'name_es',
      title: 'Name (Spanish)',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string'
    }),
    defineField({
      name: 'subLinks',
      title: 'Sub Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name_en',
              title: 'Name (English)',
              type: 'string',
              validation: rule => rule.required()
            }),
            defineField({
              name: 'name_es',
              title: 'Name (Spanish)',
              type: 'string',
              validation: rule => rule.required()
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string'
            })
          ]
        }
      ]
    })
  ]
});
