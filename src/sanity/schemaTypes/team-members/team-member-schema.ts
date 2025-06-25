import { validationLang } from '@/sanity/lib/validation-lang';
import { defineField, defineType } from 'sanity';

export const teamMemberSchema = defineType({
  name: 'team_members',
  title: 'Team Members',
  type: 'document',
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
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required().error('Name is required')
    }),
    defineField({
      name: 'short_intro',
      title: 'Short Intruction',
      description: 'Write 10-15 characters',
      type: 'internationalizedArrayText',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(
            value,
            'Please add short description of a member'
          );
        })
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'reference',
      to: [{ type: 'team_member_roles' }],
      validation: rule => rule.required().error('Role is required')
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          validation: rule =>
            rule.uri({
              scheme: ['http', 'https']
            })
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          validation: rule =>
            rule.uri({
              scheme: ['http', 'https']
            })
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
          validation: rule =>
            rule.uri({
              scheme: ['http', 'https']
            })
        }
      ]
    })
  ]
});
