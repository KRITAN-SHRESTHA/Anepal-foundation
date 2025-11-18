import { defineType } from 'sanity';
import { Heart } from 'lucide-react';
import { validationLang } from '@/sanity/lib/validation-lang';

export const helpSectionItemSchema = defineType({
  name: 'help_section_item',
  title: 'Help Section Item',
  type: 'object',
  icon: Heart,
  fields: [
    {
      name: 'name',
      title: 'Card Title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add card title in all languages'
          );
        })
    },
    {
      name: 'content',
      title: 'Card Description',
      type: 'internationalizedArrayText',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add description in all languages'
          );
        })
    },
    {
      name: 'btnText',
      title: 'Button Text',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add button text in all languages'
          );
        })
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description:
        'Relative URL path (e.g., /volunteer, /payment, /donors-partners)',
      validation: rule =>
        rule
          .required()
          .regex(/^\/[a-zA-Z0-9\-]*$/, {
            name: 'path',
            invert: false
          })
          .error('Please enter a valid path starting with / (e.g., /volunteer)')
    },
    {
      name: 'imageUrl',
      title: 'Card Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Image for the help card (recommended size: 400x400px)',
      validation: rule => rule.required().error('Image is required')
    }
  ],
  preview: {
    select: {
      title: 'name.0.value',
      media: 'imageUrl'
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || 'Help Section Item',
        media: media
      };
    }
  }
});
