import { ImageIcon } from '@sanity/icons';
import { defineType } from 'sanity';

import { validationLang } from '../../lib/validation-lang';
import {
  InternationalizedArrayStringValue,
  InternationalizedArrayTextValue,
  SanityImageCrop
} from '@/sanity/types';
import { SanityImageHotspot } from '@sanity/image-url/lib/types/types';

type ContentType = Array<{
  title?: Array<
    {
      _key: string;
    } & InternationalizedArrayStringValue
  >;
  description?: Array<
    {
      _key: string;
    } & InternationalizedArrayTextValue
  >;
  image?: {
    asset?: {
      _ref: string;
      _type: 'reference';
      _weak?: boolean;
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: 'image';
  };
  _key: string;
}>;

export const whatWeDoSchema = defineType({
  title: 'What we do',
  name: 'what_we_do',
  type: 'document',
  icon: ImageIcon,
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
      name: 'badge_text',
      title: 'Badge text',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule
          .required()
          .custom<{ value: string; _type: string; _key: string }[]>(value => {
            return validationLang(
              value,
              'Please add badge text in all languages'
            );
          })
    },
    {
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add description in all languages'
          );
        })
    },
    {
      name: 'background_img',
      title: 'background Image',
      type: 'image',
      description: 'Recommended size: 580x430px',
      options: {
        hotspot: true
      },
      validation: rule => rule.required().error('Image is required')
    },

    {
      name: 'content',
      title: 'Add content',
      type: 'array',
      description: 'Create upto 4 content only',
      validation: rule =>
        rule.custom((arr: ContentType[]) => {
          // arr will gives the array of selected fields
          if (!arr) return 'Please create at least one content';

          if (arr.length > 4) {
            return 'Only create upto 4 content';
          }
          return true;
        }),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'internationalizedArrayString',
              validation: rule =>
                rule.custom<{ value: string; _type: string; _key: string }[]>(
                  value => {
                    return validationLang(
                      value,
                      'Please add name in all languages'
                    );
                  }
                )
            },
            {
              name: 'heading',
              title: 'Heading',
              type: 'internationalizedArrayString',
              validation: rule =>
                rule.custom<{ value: string; _type: string; _key: string }[]>(
                  value => {
                    return validationLang(
                      value,
                      'Please add heading in all languages'
                    );
                  }
                )
            },
            {
              name: 'description',
              title: 'Description',
              type: 'internationalizedArrayText',
              validation: rule =>
                rule.custom<{ value: string; _type: string; _key: string }[]>(
                  value => {
                    return validationLang(
                      value,
                      'Please add description in all languages'
                    );
                  }
                )
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: rule => rule.required().error('Image is required')
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            },
            prepare(args) {
              return {
                title: args.title?.[0]?.value || 'Untitled',
                media: args.media
              };
            }
          }
        }
      ]
    }
  ],

  preview: {
    select: {
      title: 'title'
    },
    prepare(args) {
      return {
        title: args.title?.[0]?.value || ''
      };
    }
  }
});
