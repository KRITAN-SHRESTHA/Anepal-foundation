import { defineType, defineField } from 'sanity';
import { validationLang } from '../lib/validation-lang';

export const presenterType = defineType({
  title: 'Presenter',
  name: 'presenter',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string'
    }),
    defineField({
      name: 'greeting',
      type: 'internationalizedArrayString',
      validation: rule =>
        rule.custom<{ value: string; _type: string; _key: string }[]>(value => {
          return validationLang(value, 'Greeting is required');
        })
    })
  ]
});
