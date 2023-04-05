import { db } from "./conn"
import { sql } from 'drizzle-orm'
import { memeTags } from "./schema"

const resetDb = async () => {
  await db.execute(sql`TRUNCATE meme_tags`)
  await db.insert(memeTags)
    .values(
      {
        memeUrl: '/img/doom_eternal.jpg',
        tag: 'fubar'
      },
      {
        memeUrl: '/img/doom_lore.jpg',
        tag: 'bohica'
      },
      {
        memeUrl: '/img/doom_unicorn.jpg',
        tag: 'fubar'
      },
      {
        memeUrl: '/img/doom_unicorn.jpg',
        tag: 'snafu'
      },
      {
        memeUrl: '/img/doom_meow.jpg',
        tag: 'fubar'
      },
      {
        memeUrl: '/img/doom_meow.jpg',
        tag: 'snafu'
      },
      {
        memeUrl: '/img/doom_meow.jpg',
        tag: 'wtf'
      },
    )
}

export default resetDb