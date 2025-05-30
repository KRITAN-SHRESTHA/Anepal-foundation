import { eq } from 'drizzle-orm';
import { cache } from 'react';
import superjson from 'superjson';

import { db } from '@/db';
import { initTRPC, TRPCError } from '@trpc/server';
import { userTable } from '@/db/schema/auth-schema';
import { checkAuth } from '@/lib/auth';

export const createTRPCContext = cache(async () => {
  const user = await checkAuth();

  if (!user) {
    return { userId: null };
  }
  return { userId: user.id };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  transformer: superjson
  // errorFormatter: ({ shape, error }) => ({
  //   ...shape,
  //   data: {
  //     ...shape.data,
  //     zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
  //   },
  // }),
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
/**
 * Public procedure
 */
export const publicProcedure = t.procedure;
/**
 * Protected procedure
 */
export const protectedProcedure = t.procedure.use(
  async function isAuthed(opts) {
    const { ctx } = opts;

    if (!ctx.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED'
      });
    }

    const [user_data] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, ctx.userId))
      .limit(1);
    // console.log('🚀 ~ user_data:', user_data);

    if (!user_data) {
      throw new TRPCError({
        code: 'UNAUTHORIZED'
      });
    }

    // const { success } = await ratelimit.limit(
    //   user.id
    //   //   ,{
    //   //   ip: 'ip-add'
    //   // }
    // );

    // if (!success) {
    //   throw new TRPCError({
    //     code: 'TOO_MANY_REQUESTS',
    //   });
    // }

    return opts.next({
      ctx: {
        userId: ctx.userId,
        user: user_data
      }
    });
  }
);
