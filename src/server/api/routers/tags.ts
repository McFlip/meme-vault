import { z } from "zod";
import { dbSearchTags } from "~/db/queries";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tagsRouter = createTRPCRouter({
  getSearchResults: publicProcedure
    .input(z.object({ qstr: z.string() }))
    .query(async ({ input }) => {
      const res = await dbSearchTags(input.qstr)
      return {
        tags: res.map(row => row.tag),
      };
    }),
});
