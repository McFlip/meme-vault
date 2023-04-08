import { z } from "zod"
import {
  dbSearchTags,
  dbGetMemesByTags,
  dbGetAvailableTags,
} from "~/db/queries"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const tagsRouter = createTRPCRouter({
  getSearchResults: publicProcedure
    .input(z.object({ qstr: z.string() }))
    .query(async ({ input }) => {
      const res = await dbSearchTags(input.qstr)
      return {
        tags: res,
      }
    }),
  getMemesByTags: publicProcedure
    .input(z.object({ tags: z.array(z.string().regex(/[a-zA-Z0-9 ]+/)) }))
    .query(async ({ input }) => {
      const res = await dbGetMemesByTags(input.tags)
      return {
        memes: res,
      }
    }),
  getAvailableTags: publicProcedure
    .input(
      z.object({ selectedTags: z.array(z.string().regex(/[a-zA-Z0-9 ]+/)) })
    )
    .query(async ({ input }) => {
      const res = await dbGetAvailableTags(input.selectedTags)
      return {
        tags: res,
      }
    }),
})
