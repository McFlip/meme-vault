import { createInnerTRPCContext } from "~/server/api/trpc"
import { AppRouter, appRouter } from "~/server/api/root"
import { inferProcedureInput } from '@trpc/server'

describe('Tags Router', () => {
  it('searches tags by query string', async () => {
    const ctx = createInnerTRPCContext({})
    const caller = appRouter.createCaller(ctx)
    const input: inferProcedureInput<AppRouter['tags']['getSearchResults']> = {
      qstr: 'fu'
    }
    const expected = 'fubar'
    const actual = await caller.tags.getSearchResults(input)
    expect(actual.tags[0]).toBe(expected)
    expect(actual.tags).toHaveLength(1)
  })

})