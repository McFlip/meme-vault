import { db } from "./conn"
import {eq, like, or} from "drizzle-orm/expressions"
// import type { MemeTag, NewMemeTag } from "./schema"
import { memeTags } from "./schema"

export const dbSearchTags = async (qstr: string) => await db.select({tag: memeTags.tag}).from(memeTags).where(like(memeTags.tag, `%${qstr}%`))
export const dbGetMemesByTags = async (tags:string[]) => {
  const orExpression = tags.map(tag => eq(memeTags.tag, tag))
  return await db.select({meme_url: memeTags.memeUrl})
    .from(memeTags)
    .where(or(...orExpression))
}