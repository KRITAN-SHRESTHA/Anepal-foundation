import { type SchemaTypeDefinition } from 'sanity';

import { bannerType } from './homepage/bannerType';
import { headerType } from './headerType';
import { settingsType } from './settingsType';
import { aboutAnepalType } from './homepage/about-anepal-type';
import { homeContentType } from './homepage/homeContentType';
import { whatmakesUsUniqueType } from './homepage/what-makes-us-unique';
import { eventsType } from './eventsType';
import { blockContentType } from './blockContentType';
import { aboutUsType } from './aboutUsType';
import { teamMemberType } from './team-members/teamMemberType';
import { teamMemberRolesType } from './team-members/teamMemberRoleType';
import { aboutTeamMembersType } from './team-members/aboutTeamMembersType';
import { donorsPartnersType } from './donors-and-partners/donors-partners-type';
import { donorsList } from './donors-and-partners/donors-list';
import { partnersList } from './donors-and-partners/partners-list';
import { organizationStatsType } from './organization-stats-type';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    bannerType,
    headerType,
    settingsType,
    homeContentType,
    aboutAnepalType,
    whatmakesUsUniqueType,
    eventsType,
    blockContentType,
    aboutUsType,
    teamMemberType,
    teamMemberRolesType,
    aboutTeamMembersType,
    donorsPartnersType,
    donorsList,
    partnersList,
    organizationStatsType
  ]
};
