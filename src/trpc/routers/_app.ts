import { aboutusRouter } from '@/modules/about/server/procedure';
import { blogsRouter } from '@/modules/blogs/server/procedure';
import { contactRouter } from '@/modules/contacts/server/procedure';
import { donorsPartnersRouter } from '@/modules/donors-partners/server/procedure';
import { eventsRouter } from '@/modules/events/server/procedure';
import { homeRouter } from '@/modules/home/server/procedure';
import { paymentRoute } from '@/modules/payment/server/procedure';
import { storiesRouter } from '@/modules/stories/server/procedure';
import { teamMemberRouter } from '@/modules/team-member/server/procedure';
import { volunteerRouter } from '@/modules/volunteer/server/procedure';
import { createTRPCRouter } from '../init';
import { headerRouter } from '../server/header-procedure';
import { settingsRouter } from '../server/settings-procedure';
import { policiesRouter } from '@/modules/policies/server/procedure';

export const appRouter = createTRPCRouter({
  home: homeRouter,
  header: headerRouter,
  settings: settingsRouter,
  payment: paymentRoute,
  events: eventsRouter,
  aboutus: aboutusRouter,
  teamMember: teamMemberRouter,
  donorsPartners: donorsPartnersRouter,
  stories: storiesRouter,
  blogs: blogsRouter,
  contact: contactRouter,
  policies: policiesRouter,
  volunteer: volunteerRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
