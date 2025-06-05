import { authRouter } from '@/modules/auth/server/procedures';
import { createTRPCRouter } from '../init';
import { homeRouter } from '@/modules/home/server/procedure';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  home: homeRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
