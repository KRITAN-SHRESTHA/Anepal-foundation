import { validationLang } from '@/sanity/lib/validation-lang';
import { defineField, defineType } from 'sanity';

export const teamMembersRoleSchema = defineType({
  name: 'team_member_roles',
  title: 'Roles',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add title in all languages');
        })
    })
  ],
  preview: {
    select: {
      name: 'name'
    },
    prepare(args) {
      return {
        title: args.name?.[0]?.value || ''
      };
    }
  }
});
