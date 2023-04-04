import { dbGetMemesByTags } from '~/db/queries'

describe('db query to get all memes matching every listed tag', () => {
  it('finds the lone bohica tag', async () => {
    const expected = ['https://i.ytimg.com/vi/ris-1JmOg-U/maxresdefault.jpg']
    const actual = await dbGetMemesByTags(['bohica'])
    expect(actual).toEqual(expected)
  }),
  it('finds the 3 fubar tags', async () => {
    const expectedLength = 3
    const expectedTag1 = 'https://pbs.twimg.com/media/Et1kXL0XMAUj5Iw?format=jpg&name=small'
    const expectedTag2 = 'https://preview.redd.it/tnl3actbwk651.png?auto=webp&s=a1bcfc72a69e355a23f860f2e20b9ed85033665c'
    const expectedTag3 = 'https://forums.frontier.co.uk/attachments/doom_meow-jpg.300893/'
    const actual = await dbGetMemesByTags(['fubar'])
    expect(actual.length).toEqual(expectedLength)
    expect(actual).toContainEqual(expectedTag1)
    expect(actual).toContainEqual(expectedTag2)
    expect(actual).toContainEqual(expectedTag3)
  }),
  it('finds the 2 snafu tags', async () => {
    const expectedLength = 2
    const expectedTag2 = 'https://preview.redd.it/tnl3actbwk651.png?auto=webp&s=a1bcfc72a69e355a23f860f2e20b9ed85033665c'
    const expectedTag3 = 'https://forums.frontier.co.uk/attachments/doom_meow-jpg.300893/'
    const actual = await dbGetMemesByTags(['snafu'])
    expect(actual.length).toEqual(expectedLength)
    expect(actual).toContainEqual(expectedTag2)
    expect(actual).toContainEqual(expectedTag3)
  }),
  it('finds the 2 memes that have both fubar and snafu tags', async () => {
    const expectedLength = 2
    const expectedTag2 = 'https://preview.redd.it/tnl3actbwk651.png?auto=webp&s=a1bcfc72a69e355a23f860f2e20b9ed85033665c'
    const expectedTag3 = 'https://forums.frontier.co.uk/attachments/doom_meow-jpg.300893/'
    const actual = await dbGetMemesByTags(['fubar','snafu'])
    expect(actual.length).toEqual(expectedLength)
    expect(actual).toContainEqual(expectedTag2)
    expect(actual).toContainEqual(expectedTag3)
  }),
  it('finds the 1 meme that has the fubar, wtf, and snafu tags', async () => {
    const expectedLength = 1
    const expectedTag3 = 'https://forums.frontier.co.uk/attachments/doom_meow-jpg.300893/'
    const actual = await dbGetMemesByTags(['fubar','snafu','wtf'])
    expect(actual.length).toEqual(expectedLength)
    expect(actual).toContainEqual(expectedTag3)
  })
})