import { validationLang } from '@/sanity/lib/validation-lang';
import { List } from 'lucide-react';
import { defineType } from 'sanity';

export const storiesPageSchema = defineType({
  name: 'storiesPageContent',
  title: 'Stories Page Content',
  icon: List,
  type: 'document',
  fields: [
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
          validation: rule =>
            rule.custom<{ value: string; _type: string; _key: string }[]>(
              value => {
                return validationLang(
                  value,
                  'Please add title in all languages'
                );
              }
            )
        }
      ]
    }
    // {
    //   name: 'stories',
    //   title: 'Select Stories',
    //   type: 'array',
    //   validation: rule =>
    //     rule.custom((arr: Reference[]) => {
    //       // arr will gives the array of selected fields
    //       if (!arr) return 'Please select at least a story';

    //       const refs = arr.map(item => item._ref);
    //       const hasDuplicates = refs.length !== new Set(refs).size;
    //       return hasDuplicates ? 'No duplicate selections allowed' : true;
    //     }),
    //   of: [
    //     defineArrayMember({ type: 'reference', to: { type: 'storiesList' } })
    //   ]
    // }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare() {
      return {
        title: 'Stories page'
      };
    }
  }
});
