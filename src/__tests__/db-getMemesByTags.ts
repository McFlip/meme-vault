import { dbGetMemesByTags } from '~/db/queries'

describe('db query to get all memes matching every listed tag', () => {
  it('filters memes on tags', async () => {
    const expected = [{meme_url: 'https://pbs.twimg.com/media/Et1kXL0XMAUj5Iw?format=jpg&name=small'}]
    const actual = await dbGetMemesByTags(['fubar'])
    expect(actual).toEqual(expected)
  })
})