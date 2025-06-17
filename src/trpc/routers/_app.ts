import { createTRPCRouter } from '../init';
import { homeRouter } from '@/modules/home/server/procedure';
import { headerRouter } from '../server/header-procedure';
import { settingsRouter } from '../server/settings-procedure';
import { paymentRoute } from '@/modules/payment/server/procedure';

export const appRouter = createTRPCRouter({
  home: homeRouter,
  header: headerRouter,
  settings: settingsRouter,
  payment: paymentRoute
});
// export type definition of API
export type AppRouter = typeof appRouter;
