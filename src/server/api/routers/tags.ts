import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tagsRouter = createTRPCRouter({
  getSearchResults: publicProcedure
    .input(z.object({ qstr: z.string() }))
    .query(({ input }) => {
      return {
        tags: ['fubar'],
      };
    }),
});
