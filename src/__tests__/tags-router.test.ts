import { createInnerTRPCContext } from "~/server/api/trpc"
import { AppRouter, appRouter } from "~/server/api/root"
import { inferProcedureInput } from "@trpc/server"

describe("Tags Router", () => {
  const ctx = createInnerTRPCContext({})
  const caller = appRouter.createCaller(ctx)
  it.concurrent("searches tags by query string", async () => {
    const input: inferProcedureInput<AppRouter["tags"]["getSearchResults"]> = {
      qstr: "fub",
    }
    const expected = "fubar"
    const actual = await caller.tags.getSearchResults(input)
    expect(actual.tags[0]).toBe(expected)
    expect(actual.tags).toHaveLength(1)
  })
  it.concurrent("gets all memes matching tag filters", async () => {
    const input: inferProcedureInput<AppRouter["tags"]["getMemesByTags"]> = {
      tags: ["fubar"],
    }
    const expected = {
      memes: [
        "/img/doom_eternal.jpg",
        "/img/doom_unicorn.jpg",
        "/img/doom_meow.jpg",
      ],
    }
    const actual = await caller.tags.getMemesByTags(input)
    expect(actual).toEqual(expected)
  })
  it.concurrent("gets empty result due to AND condition", async () => {
    const input: inferProcedureInput<AppRouter["tags"]["getMemesByTags"]> = {
      tags: ["fubar", "bohica"],
    }
    const expected = {
      memes: [],
    }
    const actual = await caller.tags.getMemesByTags(input)
    expect(actual).toEqual(expected)
  })
  it.concurrent(
    "finds the 2 memes that have both fubar and snafu tags",
    async () => {
      const input: inferProcedureInput<AppRouter["tags"]["getMemesByTags"]> = {
        tags: ["fubar", "snafu"],
      }
      const expectedLength = 2
      const expectedUnicorn = "/img/doom_unicorn.jpg"
      const expectedMeow = "/img/doom_meow.jpg"
      const { memes: actual } = await caller.tags.getMemesByTags(input)
      expect(actual.length).toEqual(expectedLength)
      expect(actual).toContainEqual(expectedUnicorn)
      expect(actual).toContainEqual(expectedMeow)
    }
  )
  it.concurrent(
    "finds the 1 meme that has the fubar, wtf, and snafu tags",
    async () => {
      const input: inferProcedureInput<AppRouter["tags"]["getMemesByTags"]> = {
        tags: ["fubar", "wtf", "snafu"],
      }
      const expectedLength = 1
      const expectedMeow = "/img/doom_meow.jpg"
      const { memes: actual } = await caller.tags.getMemesByTags(input)
      expect(actual.length).toEqual(expectedLength)
      expect(actual).toContainEqual(expectedMeow)
    }
  )
})
