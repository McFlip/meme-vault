import { db } from "./conn"
import {eq, like} from "drizzle-orm/expressions"
import type { MemeTag, NewMemeTag } from "./schema"
import { memeTags } from "./schema"

export const dbSearchTags = async (qstr: string) => await db.select({tag: memeTags.tag}).from(memeTags).where(like(memeTags.tag, `%${qstr}%`))