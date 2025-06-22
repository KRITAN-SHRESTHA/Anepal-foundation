import { defineField, defineType } from 'sanity';
import { Info } from 'lucide-react';
import { validationLang } from '../lib/validation-lang';

export const aboutUsType = defineType({
  name: 'aboutus',
  title: 'About us',
  type: 'document',
  icon: Info,
  fields: [
    defineField({
      name: 'heroimage',
      title: 'Hero image',
      type: 'image',
      description: 'Hero image (recommended size: 1440 × 687px)',
      validation: rule => rule.required().error('Hero image is required'),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (about image)',
          validation: rule => rule.required().error('Image alt is required')
        })
      ]
    }),
    defineField({
      name: 'firstcontent',
      title: 'First content',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Image (recommended size: 400 × 400px)',
          validation: rule => rule.required().error('Image is required'),
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text (about image)',
              validation: rule => rule.required().error('Image alt is required')
            })
          ]
        }),
        defineField({
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
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'internationalizedArrayText',
          validation: rule =>
            rule
              .required()
              .custom<
                { value: string; _type: string; _key: string }[]
              >(value => {
                return validationLang(
                  value,
                  'Please add description in all languages'
                );
              })
        })
      ]
    }),
    defineField({
      name: 'secondcontent',
      title: 'Second content',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Image (recommended size: 400 × 400px)',
          validation: rule => rule.required().error('Image is required'),
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text (about image)',
              validation: rule => rule.required().error('Image alt is required')
            })
          ]
        }),
        defineField({
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
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'internationalizedArrayText',
          validation: rule =>
            rule
              .required()
              .custom<
                { value: string; _type: string; _key: string }[]
              >(value => {
                return validationLang(
                  value,
                  'Please add description in all languages'
                );
              })
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'About us'
      };
    }
  }
});
