import { defineArrayMember, defineField, defineType } from 'sanity';
import { Info } from 'lucide-react';

export const aboutTeamMembersType = defineType({
  name: 'about_team_members',
  title: 'About',
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
      name: 'membersList',
      title: 'Members',
      type: 'array',
      validation: rule => rule.required().error('Please select member'),
      of: [
        defineArrayMember({ type: 'reference', to: { type: 'team_members' } })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'About Team members'
      };
    }
  }
});
