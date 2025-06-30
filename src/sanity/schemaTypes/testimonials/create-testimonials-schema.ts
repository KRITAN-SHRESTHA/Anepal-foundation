import { defineType } from 'sanity';
import { Info } from 'lucide-react';
import { validationLang } from '@/sanity/lib/validation-lang';

export const createtestimonialsSchema = defineType({
  name: 'testimonials_list',
  title: 'Testimonials',
  type: 'document',
  icon: Info,
  fields: [
    {
      name: 'user_name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required().error('Name is required')
    },
    {
      name: 'content',
      title: 'Content',
      type: 'internationalizedArrayText',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add content in all languages');
        })
    },
    {
      name: 'role',
      title: 'Role',
      type: 'reference',
      to: [{ type: 'team_member_roles' }],
      validation: rule => rule.required().error('Role is required')
    }
  ]
});
