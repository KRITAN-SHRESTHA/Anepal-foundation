import { defineType } from 'sanity';
import { Handshake } from 'lucide-react';
import { validationLang } from '@/sanity/lib/validation-lang';

export const helpSectionSchema = defineType({
  name: 'home_help_section',
  title: 'Home Help Section',
  type: 'document',
  icon: Handshake,
  fields: [
    {
      name: 'badge_text',
      title: 'Badge Text',
      type: 'internationalizedArrayString',
      description:
        'Label that appears above the title (e.g., "HOW YOU CAN HELP")',
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
          return validationLang(
            value,
            'Please add section title in all languages'
          );
        })
    },
    {
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayText',
      description: 'Main description text with quote mark',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add description in all languages'
          );
        })
    },
    // {
    //   name: 'cta_button_text',
    //   title: 'CTA Button Text',
    //   type: 'internationalizedArrayString',
    //   description: 'Text for the "Contact Us" button',
    //   validation: rule =>
    //     rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
    //       return validationLang(
    //         value,
    //         'Please add CTA button text in all languages'
    //       );
    //     })
    // },
    {
      name: 'help_items',
      title: 'Help Cards',
      type: 'array',
      of: [
        {
          type: 'help_section_item'
        }
      ],
      validation: rule =>
        rule
          .required()
          .min(1)
          .error('At least one help card is required')
          .max(3)
          .error('Maximum 3 help cards allowed')
    }
    // {
    //   name: 'stat_1_value',
    //   title: 'Stat 1 Value',
    //   type: 'string',
    //   description: 'First stat value (e.g., "100%")',
    //   validation: rule => rule.required().error('Stat 1 value is required')
    // },
    // {
    //   name: 'stat_1_label',
    //   title: 'Stat 1 Label',
    //   type: 'internationalizedArrayString',
    //   description: 'First stat label (e.g., "Dedicated")',
    //   validation: rule =>
    //     rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
    //       return validationLang(
    //         value,
    //         'Please add stat 1 label in all languages'
    //       );
    //     })
    // },
    // {
    //   name: 'stat_2_value',
    //   title: 'Stat 2 Value',
    //   type: 'string',
    //   description: 'Second stat value (e.g., "Impactful")',
    //   validation: rule => rule.required().error('Stat 2 value is required')
    // },
    // {
    //   name: 'stat_2_label',
    //   title: 'Stat 2 Label',
    //   type: 'internationalizedArrayString',
    //   description: 'Second stat label (e.g., "Mission")',
    //   validation: rule =>
    //     rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
    //       return validationLang(
    //         value,
    //         'Please add stat 2 label in all languages'
    //       );
    //     })
    // }
  ],
  preview: {
    prepare() {
      return {
        title: 'Help Section'
      };
    }
  }
});
