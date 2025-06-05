import { type SchemaTypeDefinition } from 'sanity';

import { blockContentType } from './blockContentType';
import { categoryType } from './categoryType';
import { postType } from './postType';
import { authorType } from './authorType';
import { bannerType } from './bannerType';
import { headerType } from './headerType';
import { presenterType } from './presenterType';
import { settingsType } from './settingsType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    bannerType,
    headerType,
    presenterType,
    settingsType
  ]
};
