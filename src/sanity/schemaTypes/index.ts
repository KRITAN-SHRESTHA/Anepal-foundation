import { type SchemaTypeDefinition } from 'sanity';

import { headerSchema } from './header-schema';
import { bannerSchema } from './home/banner-schema';
import { aboutAnepalSchema } from './home/about-anepal-schema';
import { homeContentSchema } from './home/home-content-schema';
import { whatmakesUsUniqueSchema } from './home/what-makes-us-unique-schema';
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
import { teamMembersPageSchema } from './team-members/team-members-page-schema';
import { eventsPageSchema } from './events/events-page-schema';
import { orgHelpsInFieldsSchema } from './home/org-helps-in-fields-schema';
import { settingsSchema } from './settings-schema';
import { homePageSchema } from './home/homepage-schema';
import { orgHelpsInFieldsCopySchema } from './home/org-helps-in-fields-schema copy';
import { featuredProjetsSchema } from './home/featured-projects-schema';
import { homeStatsSchema } from './home/home-stats';
import { createtestimonialsSchema } from './testimonials/create-testimonials-schema';
import { homeTestimonialsSchema } from './home/home-testimonials-schema';
import { homePartnersSchema } from './home/partners-section-schema';
import { homeTeamMemberSchema } from './home/team-member-schema';
import { homeEventsSchema } from './home/events-section-schema';
import { homeGallerySchema } from './home/gallery-section-schema';

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
    eventsPageSchema,
    orgHelpsInFieldsSchema,
    homePageSchema,
    orgHelpsInFieldsCopySchema,
    featuredProjetsSchema,
    homeStatsSchema,
    createtestimonialsSchema,
    homeTestimonialsSchema,
    homePartnersSchema,
    homeTeamMemberSchema,
    homeEventsSchema,
    homeGallerySchema
  ]
};
