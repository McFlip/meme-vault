import { createInnerTRPCContext } from "~/server/api/trpc"
import { AppRouter, appRouter } from "~/server/api/root"
import { inferProcedureInput } from '@trpc/server'

describe('Tags Router', () => {
  const ctx = createInnerTRPCContext({})
  const caller = appRouter.createCaller(ctx)
  it('searches tags by query string', async () => {
    const input: inferProcedureInput<AppRouter['tags']['getSearchResults']> = {
      qstr: 'fub'
    }
    const expected = 'fubar'
    const actual = await caller.tags.getSearchResults(input)
    expect(actual.tags[0]).toBe(expected)
    expect(actual.tags).toHaveLength(1)
  })
  it('gets all memes matching tag filters', async () => {
    const input: inferProcedureInput<AppRouter['tags']['getMemesByTags']> = {
      tags: ['fubar']
    }
    const expected = { memes: [
      'https://pbs.twimg.com/media/Et1kXL0XMAUj5Iw?format=jpg&name=small',
      'https://preview.redd.it/tnl3actbwk651.png?auto=webp&s=a1bcfc72a69e355a23f860f2e20b9ed85033665c',
      'https://forums.frontier.co.uk/attachments/doom_meow-jpg.300893/',
    ]}
    const actual = await caller.tags.getMemesByTags(input)
    expect(actual).toEqual(expected)
  })
  it('gets empty result due to AND condition', async () => {
    const input: inferProcedureInput<AppRouter['tags']['getMemesByTags']> = {
      tags: ['fubar', 'bohica']
    }
    const expected = {
      memes: []
    }
    const actual = await caller.tags.getMemesByTags(input)
    expect(actual).toEqual(expected)
  })
})