// ./schemas/presenterType.ts

import { defineType, defineField } from 'sanity';

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
          if (!value) {
            return 'Title is required';
          }

          //  value = [
          //   { "_key": "en", "value": "hello" },
          //   { "_key": "fr", "value": "bonjour" },
          // ]

          const hasEnglish = value[0]._key === 'en' && !!value[0].value;
          const hasSpanish = value[1]._key === 'es' && !!value[1].value;

          if (!hasEnglish) return 'English translation is required';
          if (!hasSpanish) return 'Spanish translation is required';

          return true;
        })
    })
  ]
});
