import { type SchemaTypeDefinition } from 'sanity';

import { bannerType } from './homepage/bannerType';
import { headerType } from './headerType';
import { settingsType } from './settingsType';
import { aboutAnepalType } from './homepage/about-anepal-type';
import { homeContentType } from './homepage/homeContentType';
import { whatmakesUsUniqueType } from './homepage/what-makes-us-unique';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    bannerType,
    headerType,
    settingsType,
    homeContentType,
    aboutAnepalType,
    whatmakesUsUniqueType
  ]
};
