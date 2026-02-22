import { createTRPCRouter } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  // Portfolio Content Administration
  //   userAdmin: userAdminRouter,
  //   projectAdmin: projectAdminRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
