import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    }),
    // defineField({
    //   name: 'author',
    //   type: 'reference',
    //   to: { type: 'author' }
    // }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        })
      ]
    }),
    // defineField({
    //   name: 'categories',
    //   type: 'array',
    //   of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })]
    // }),
    defineField({
      name: 'organizer_info',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          type: 'number',
          title: 'Phone number (eg: +31 85 964 47 25)',
          placeholder: '+31 85 964 47 25'
        }),
        defineField({
          name: 'email',
          type: 'email',
          title: 'Enter Email'
        })
      ]
    }),
    defineField({
      name: 'venue',
      type: 'object',
      fields: [
        defineField({
          name: 'location',
          type: 'string',
          title: 'Enter location'
        })
      ]
    }),
    defineField({
      name: 'event_time',
      type: 'object',
      fields: [
        defineField({
          name: 'start',
          type: 'datetime'
          // title: 'Enter location'
        }),
        defineField({
          name: 'end',
          type: 'datetime'
          // title: 'Enter location'
        })
      ]
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime'
    }),
    defineField({
      name: 'body',
      type: 'blockContent'
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    }
  }
});
