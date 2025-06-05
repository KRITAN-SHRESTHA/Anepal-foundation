import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { validationLang } from '../lib/validation-lang';
import { client } from '../lib/client';

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
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which this item should appear (must be unique)',
      validation: rule =>
        rule
          .required()
          .integer()
          .positive()
          .custom(async (order, context) => {
            const { document } = context;

            // console.log('document', document);
            // console.log('order', order);

            // Skip check if order hasn't changed
            if (document?.order === order) return true;

            // const client = getClient({ apiVersion: '2023-05-03' });
            const query = `count(*[_type == "header" && order == $order && !(_id in [$docId])])`;
            const params = {
              order: order,
              docId: document?._id || 'drafts.' + document?._id
            };

            const count = await client.fetch(query, params);

            if (count > 0) {
              return 'This order number is already in use. Please choose a unique number.';
            }
            return true;
          })
          .error('Please provide a unique positive number for ordering')
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
