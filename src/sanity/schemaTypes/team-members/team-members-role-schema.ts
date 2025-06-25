import { defineField, defineType } from 'sanity';

export const teamMembersRoleSchema = defineType({
  name: 'team_member_roles',
  title: 'Roles',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required().error('Name is required')
    })
  ]
});
