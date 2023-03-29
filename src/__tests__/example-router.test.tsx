import { createInnerTRPCContext } from "~/server/api/trpc"
import { AppRouter, appRouter } from "~/server/api/root"
import { inferProcedureInput } from '@trpc/server'

describe('example', () => {
  it('replies to hello', async () => {
    const ctx = createInnerTRPCContext({})
    const caller = appRouter.createCaller(ctx)
    const input: inferProcedureInput<AppRouter['example']['hello']> = {
      text: 'Sam I Am'
    }
    const expected = 'Hello Sam I Am'
    const actual = await caller.example.hello(input)
    expect(actual.greeting).toBe(expected)
  })

})