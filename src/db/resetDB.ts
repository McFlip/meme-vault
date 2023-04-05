import { db } from "./conn"
import { sql } from 'drizzle-orm'
import { memeTags } from "./schema"

const resetDb = async () => {
  await db.execute(sql`TRUNCATE meme_tags`)
  await db.insert(memeTags)
    .values(
      {
        memeUrl: 'https://pbs.twimg.com/media/Et1kXL0XMAUj5Iw?format=jpg&name=small',
        tag: 'fubar'
      },
      {
        memeUrl: 'https://i.ytimg.com/vi/ris-1JmOg-U/maxresdefault.jpg',
        tag: 'bohica'
      },
      {
        memeUrl: 'https://preview.redd.it/tnl3actbwk651.png?auto=webp&s=a1bcfc72a69e355a23f860f2e20b9ed85033665c',
        tag: 'fubar'
      },
      {
        memeUrl: 'https://preview.redd.it/tnl3actbwk651.png?auto=webp&s=a1bcfc72a69e355a23f860f2e20b9ed85033665c',
        tag: 'snafu'
      },
      {
        memeUrl: 'https://forums.frontier.co.uk/attachments/doom_meow-jpg.300893/',
        tag: 'fubar'
      },
      {
        memeUrl: 'https://forums.frontier.co.uk/attachments/doom_meow-jpg.300893/',
        tag: 'snafu'
      },
      {
        memeUrl: 'https://forums.frontier.co.uk/attachments/doom_meow-jpg.300893/',
        tag: 'wtf'
      },
    )
}

export default resetDb