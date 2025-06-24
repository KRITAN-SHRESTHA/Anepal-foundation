import { createTRPCRouter } from '../init';
import { homeRouter } from '@/modules/home/server/procedure';
import { headerRouter } from '../server/header-procedure';
import { settingsRouter } from '../server/settings-procedure';
import { paymentRoute } from '@/modules/payment/server/procedure';
import { eventsRouter } from '@/modules/events/server/procedure';
import { aboutusRouter } from '@/modules/about/server/procedure';
import { teamMemberRouter } from '@/modules/team-member/server/procedure';
import { donorsPartnersRouter } from '@/modules/donors-partners/server/procedure';

export const appRouter = createTRPCRouter({
  home: homeRouter,
  header: headerRouter,
  settings: settingsRouter,
  payment: paymentRoute,
  events: eventsRouter,
  aboutus: aboutusRouter,
  teamMember: teamMemberRouter,
  donorsPartners: donorsPartnersRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
