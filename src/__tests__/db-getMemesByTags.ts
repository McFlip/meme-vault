import { dbGetMemesByTags } from '~/db/queries'

describe('db query to get all memes matching every listed tag', () => {
  it('finds the lone bohica tag', async () => {
    const expected = ['/img/doom_lore.jpg']
    const actual = await dbGetMemesByTags(['bohica'])
    expect(actual).toEqual(expected)
  }),
  it('finds the 3 fubar tags', async () => {
    const expectedLength = 3
    const expectedTag1 = '/img/doom_eternal.jpg'
    const expectedTag2 = '/img/doom_unicorn.jpg'
    const expectedTag3 = '/img/doom_meow.jpg'
    const actual = await dbGetMemesByTags(['fubar'])
    expect(actual.length).toEqual(expectedLength)
    expect(actual).toContainEqual(expectedTag1)
    expect(actual).toContainEqual(expectedTag2)
    expect(actual).toContainEqual(expectedTag3)
  }),
  it('finds the 2 snafu tags', async () => {
    const expectedLength = 2
    const expectedTag2 = '/img/doom_unicorn.jpg'
    const expectedTag3 = '/img/doom_meow.jpg'
    const actual = await dbGetMemesByTags(['snafu'])
    expect(actual.length).toEqual(expectedLength)
    expect(actual).toContainEqual(expectedTag2)
    expect(actual).toContainEqual(expectedTag3)
  }),
  it('finds the 2 memes that have both fubar and snafu tags', async () => {
    const expectedLength = 2
    const expectedTag2 = '/img/doom_unicorn.jpg'
    const expectedTag3 = '/img/doom_meow.jpg'
    const actual = await dbGetMemesByTags(['fubar','snafu'])
    expect(actual.length).toEqual(expectedLength)
    expect(actual).toContainEqual(expectedTag2)
    expect(actual).toContainEqual(expectedTag3)
  }),
  it('finds the 1 meme that has the fubar, wtf, and snafu tags', async () => {
    const expectedLength = 1
    const expectedTag3 = '/img/doom_meow.jpg'
    const actual = await dbGetMemesByTags(['fubar','snafu','wtf'])
    expect(actual.length).toEqual(expectedLength)
    expect(actual).toContainEqual(expectedTag3)
  })
})