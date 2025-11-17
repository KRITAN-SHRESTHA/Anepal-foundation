import { defineType } from 'sanity';
import { Info } from 'lucide-react';
import { validationLang } from '@/sanity/lib/validation-lang';

export const homeGallerySchema = defineType({
  name: 'home_gallery',
  title: 'Home Gallery',
  type: 'document',
  icon: Info,
  fields: [
    {
      name: 'badge_text',
      title: 'Badge text',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add badge text in all languages'
          );
        })
    },
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
      name: 'images',
      title: 'Select Images',
      type: 'array',
      description: 'Add many images you want; Recommended size: 250x250px',
      validation: rule =>
        rule.custom((arr: never[]) => {
          // arr will gives the array of selected fields
          if (!arr) return 'Please select at least a image';
          return true;
        }),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image',
              options: { hotspot: true },
              validation: rule => rule.required().error('Image is required')
            }
          ],
          preview: {
            select: {
              media: 'image'
            },

            prepare(args) {
              console.log('args', args);
              return {
                title: args.media.asset._ref ?? '',
                media: args.media
              };
            }
          }
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Gallery Section'
      };
    }
  }
});
