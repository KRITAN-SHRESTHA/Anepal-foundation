import { type SchemaTypeDefinition } from 'sanity';

import { bannerType } from './bannerType';
import { headerType } from './headerType';
import { settingsType } from './settingsType';
import { aboutAnepalType } from './homepage/about-anepal-type';
import { homeContentType } from './homepage/homeContentType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // blockContentType,
    // categoryType,
    // postType,
    // authorType,
    bannerType,
    headerType,
    settingsType,
    homeContentType,
    aboutAnepalType
  ]
};
