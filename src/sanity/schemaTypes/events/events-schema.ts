import { defineType } from 'sanity';
import { Calendar } from 'lucide-react';

import { InternalizedArrayStringValueType } from '@/types';

import { validationLang } from '../../lib/validation-lang';

export const eventsSchema = defineType({
  name: 'events',
  title: 'Events',
  type: 'document',
  icon: Calendar,
  fields: [
    {
      name: 'title',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add title in all languages');
        })
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (val: InternalizedArrayStringValueType) => {
          if (
            Array.isArray(val) &&
            val[0] &&
            typeof val[0].value === 'string'
          ) {
            const convertToSlug = val[0].value
              .split(' ')
              .map((val: string) => val.toLowerCase())
              .join('-');
            return convertToSlug;
          }
          return typeof val === 'string' ? val : '';
        }
      }
    },
    {
      name: 'featured',
      type: 'boolean',
      description: 'Enable this to display the events on the homepage'
    },
    {
      name: 'short_description',
      type: 'internationalizedArrayText',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add short description in all languages'
          );
        })
    },

    {
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (about image)',
          validation: rule => rule.required().error('Image alt is required')
        }
      ]
    },
    {
      name: 'organizer_info',
      type: 'object',
      fields: [
        {
          name: 'phone',
          type: 'number',
          title: 'Enter Phone Number',
          placeholder: '+31 85 964 47 25',
          validation: rule => rule.required().error('Phone number is required')
        },
        {
          name: 'email',
          type: 'email',
          title: 'Enter Email',
          validation: rule => rule.required().error('Email is required')
        }
      ]
    },
    {
      name: 'venue',
      type: 'object',
      fields: [
        {
          name: 'location',
          type: 'string',
          title: 'Enter Location',
          validation: rule => rule.required().error('Location is required')
        }
      ]
    },
    {
      name: 'event_time',
      type: 'object',
      fields: [
        {
          name: 'start',
          type: 'datetime',
          validation: rule => rule.required().error('Start time is required')
        },
        {
          name: 'end',
          type: 'datetime',
          validation: rule => rule.required().error('End time is required')
        }
      ]
    },

    {
      name: 'body',
      type: 'object',
      fields: [
        {
          name: 'body_en',
          title: 'Body (en)',
          type: 'blockContent',
          validation: rule => rule.required().error('Body en is required')
        },
        {
          name: 'body_es',
          title: 'Body (es)',
          type: 'blockContent',
          validation: rule => rule.required().error('Body es is required')
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
