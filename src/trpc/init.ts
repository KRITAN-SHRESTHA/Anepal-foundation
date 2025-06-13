import { cache } from 'react';
import superjson from 'superjson';

import { initTRPC } from '@trpc/server';

export const createTRPCContext = cache(async () => {
  return { userId: null };
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
