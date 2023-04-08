import { db, pool } from "./conn"
import { and, eq, like, or } from "drizzle-orm/expressions"
// import type { MemeTag, NewMemeTag } from "./schema"
import { memeTags } from "./schema"

/**
 * @description Search list of all tags
 */
export const dbSearchTags = async (qstr: string) => {
  const unique = new Set(
    (
      await db
        .select({ tag: memeTags.tag })
        .from(memeTags)
        .where(like(memeTags.tag, `%${qstr}%`))
    ).map((row) => row.tag)
  )
  return [...unique]
}

/**
 * @description Searches for memes based on array of tags - meme must possess all listed tags to be responsive
 */
export const dbGetMemesByTags = async (tags: string[]) => {
  // NOTE: input is sanitized by tRPC
  // build subqueries
  const subQueries = tags
    .map(
      (tag, i) =>
        `(SELECT meme_url FROM meme_tags WHERE tag = '${tag}') AS m${i}`
    )
    .join(" NATURAL INNER JOIN ")
  const rawSql = "SELECT meme_url FROM " + subQueries + ";"
  // console.log(rawSql)
  return (await pool.query(rawSql)).rows.flatMap(
    (meme: { meme_url: string }) => meme.meme_url
  )
}

/**
 * @description Allows for drilling down in your search
 * @param selectedTags The tags that have already been selected during the search
 * @returns Tags that will cause the search to narrow. Returns empty array if you've drilled to the bottom of the path.
 */
export const dbGetAvailableTags = async (selectedTags: string[]) => {
  const orString = selectedTags
    .map((tag) => ` OR tag = '${tag}' `)
    .slice(1)
    .join("")
  const andString = selectedTags
    .map((tag) => ` AND meme_tags.tag <> '${tag}'`)
    .join("")
  const rawSql = `
  SELECT DISTINCT meme_tags.tag
  FROM
  (
    SELECT *
    FROM meme_tags
    WHERE tag = '${selectedTags[0]}' ${orString}
  ) AS tempMemes
  INNER JOIN meme_tags
  ON meme_tags.meme_url = tempMemes.meme_url ${andString}
  ;`
  // console.log(rawSql)
  interface Irow {
    tag: string
  }
  return (await pool.query(rawSql)).rows.flatMap(({ tag }: Irow) => tag)
}
