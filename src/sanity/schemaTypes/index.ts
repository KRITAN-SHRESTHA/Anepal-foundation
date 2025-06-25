import { type SchemaTypeDefinition } from 'sanity';

import { bannerSchema } from './homepage/banner-schema';
import { headerSchema } from './header-schema';
import { settingsSchema } from './settings-schema';
import { aboutAnepalSchema } from './homepage/about-anepal-schema';
import { homeContentSchema } from './homepage/home-content-schema';
import { whatmakesUsUniqueSchema } from './homepage/what-makes-us-unique-schema';
import { eventsSchema } from './events/events-schema';
import { blockContentSchema } from './block-content-schema';
import { aboutUsSchema } from './about-us-schema';
import { teamMemberSchema } from './team-members/team-member-schema';
import { teamMembersRoleSchema } from './team-members/team-members-role-schema';
import { donorsPartnersPageSchema } from './donors-and-partners/donors-partners-page-schema';
import { donorsListSchema } from './donors-and-partners/donors-list-schema';
import { partnersListSchema } from './donors-and-partners/partners-list-schema';
import { organizationStatsSchema } from './organization-stats-schema';
import { storiesListSchema } from './stories/stories-list-schema';
import { storiesPageSchema } from './stories/stories-page-schema';
import { teamMembersPageSchema } from './team-members/team-members-schema';
import { eventsPageSchema } from './events/events-page-schema';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    bannerSchema,
    headerSchema,
    settingsSchema,
    homeContentSchema,
    aboutAnepalSchema,
    whatmakesUsUniqueSchema,
    eventsSchema,
    blockContentSchema,
    aboutUsSchema,
    teamMemberSchema,
    teamMembersRoleSchema,
    teamMembersPageSchema,
    donorsPartnersPageSchema,
    donorsListSchema,
    partnersListSchema,
    organizationStatsSchema,
    storiesListSchema,
    storiesPageSchema,
    eventsPageSchema
  ]
};
