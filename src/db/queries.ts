import { db } from "./conn"
import {and, eq, like, or} from "drizzle-orm/expressions"
// import type { MemeTag, NewMemeTag } from "./schema"
import { memeTags } from "./schema"

export const dbSearchTags = async (qstr: string) => await db.select({tag: memeTags.tag}).from(memeTags).where(like(memeTags.tag, `%${qstr}%`))
export const dbGetMemesByTags = async (tags:string[]) => {
  // run 1 sub-query per tag
  const subQueriesPromise = tags.map(async tag => await db.select({meme_url: memeTags.memeUrl}).from(memeTags).where(eq(memeTags.tag, tag)))
  const subQueries = await Promise.all(subQueriesPromise)
  // inner join all of the sub-queries
  // flatten all the objects to make includes() func easier
  return subQueries.map(table => table.flatMap(row => row.meme_url)).reduce((prev, curr) => curr.filter(row => prev.includes(row)))
}