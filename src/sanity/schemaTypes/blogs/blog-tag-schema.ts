import { defineType } from 'sanity';
import { Calendar } from 'lucide-react';

import { validationLang } from '../../lib/validation-lang';

export const blogTagSchema = defineType({
  name: 'blog_tag',
  title: 'Blog Tag',
  type: 'document',
  icon: Calendar,
  fields: [
    {
      name: 'name',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Please add tag name in all languages');
        })
    }
  ],
  preview: {
    select: {
      title: 'name'
    },
    prepare(args) {
      return {
        title: args.title?.[0]?.value || ''
      };
    }
  }
});
